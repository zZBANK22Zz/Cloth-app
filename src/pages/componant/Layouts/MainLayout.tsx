import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
    Avatar,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
  } from "@nextui-org/react";
  import axios from "axios";
  import { signIn, signOut, useSession } from "next-auth/react";
  import Image from "next/image";
  import Link from "next/link";
  import React, { useEffect } from "react";
  import Footer from "../Footer";
  
  interface Props {
    children: React.ReactNode;
  }
  
  const MainLayout: React.FC<Props> = ({ children }) => {
    const session = useSession();
    const accessToken = session.data?.accessToken;
  
    const isAuthenticated = session.status === "authenticated";
    const imageUrl = session.data?.user?.image || "";
    const email = session.data?.user?.email || "";
  
    useEffect(() => {
      if (accessToken) {
        axios.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
      } else {
        axios.defaults.headers["Authorization"] = "";
      }
    }, [accessToken]);
  
    return (
      <div>
        <Navbar position="static" className="bg-white">
          <NavbarBrand></NavbarBrand>
          <NavbarContent justify="center">
            <NavbarBrand>
              <Link href="/">
                <p className="font-bold text-red-700 text-2xl font-mono underline text-center">
                  Cloth!
                </p>
              </Link>
            </NavbarBrand>
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem>
              {isAuthenticated ? (
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="bordered">
                      <div className="flex items-center space-x-1">
                        <Avatar src={imageUrl} className="w-6 h-6" />
                        <p className="text-xs text-gray-700">{email}</p>
                      </div>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="my-shop">
                      <Link href="/shop">My Shop</Link>
                    </DropdownItem>
                    <DropdownItem
                      key="sign out"
                      className="text-danger"
                      color="danger"
                      onClick={() => signOut()}
                    >
                      Sign Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <Button
                  color="default"
                  variant="flat"
                  onClick={() => signIn("google")}
                >
                  Sign In With
                  {/* <Image
                    src="src/pages/icon/Google.png"
                    alt="google logo"
                    width={24}
                    height={24} */}
                  {/* /> */}
                </Button>
              )}
            </NavbarItem>
          </NavbarContent>
        </Navbar>
        <div className="bg-gray-50" style={{ minHeight: "calc(100vh - 164px)" }}>
          {children}
        </div>
        <Footer />
      </div>
    );
  };
  
  export default MainLayout;