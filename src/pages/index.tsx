import React, { useState } from "react";
import MyNavbar from "./componant/Navbar";
import Footer from "./componant/Footer";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";

import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main className="bg-gray-100 min-h-screen">
        <MyNavbar />
        <div className="mt-6 ml-10 flex justify-between items-center mx-10">
          <h1 className="text-black font-bold text-2xl mb-4">All Clothes</h1>
          <Link href="./shop/Create">
            <Button>Add Product</Button>
          </Link>
        </div>

        <hr className="my-4 mx-10 border-gray-300" />
        {/* Line between Header and Body */}

        <div>
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 p-4 px-10">
            <Card shadow="sm">
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt="PlusIcon"
                  className="w-full object-cover h-[140px]"
                  src="https://thumbs.dreamstime.com/b/plus-icon-vector-technology-concept-thin-line-illustration-editable-stroke-linear-sign-use-web-mobile-apps-logo-192180395.jpg"
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>available</b>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
