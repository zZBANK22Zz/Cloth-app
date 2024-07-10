import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import React from "react";

const SignIn = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <h1 className="mb-4 text-2xl">Learn Next JS</h1>
      <Button onClick={() => signIn("google", { callbackUrl: "/" })}>
        Login with Google
      </Button>
    </div>
  );
};

export default SignIn;