import React from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import googleLogo from "../icon/Google.png";

export default function MyNavbar() {
  return (
    <div className="flex justify-center items-center bg-white h-11 px-4 relative my-5">
      <div className="flex justify-center items-center mb-5">
        <h1 className="text-red-600 font-bold underline text-xl">Cloth!</h1>
        <div className="absolute right-10">
          <Button className="bg-gray-200 text-black font-bold flex items-center rounded-lg p-2 text-xs">
            Sign in with
            <Image
              src={googleLogo}
              alt="Google logo"
              width={18}
              height={18}
              // className="ml"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
