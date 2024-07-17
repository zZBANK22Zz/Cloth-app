import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import React from "react";

const SignIn = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <h1 className="mb-4 text-2xl">Learn Next JS</h1>
      <Button onClick={() => signIn("google", { callbackUrl: "/" })} className="flex items-center">
        <FcGoogle className="text-xl" />
      </Button>
    </div>
  );
};

export default SignIn;