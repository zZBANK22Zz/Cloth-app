import  Link  from "next/link";
import MainLayout from "./componant/Layouts/MainLayout";
import React from "react";
import { Button } from "@nextui-org/react";

const HomePage = () => {
  return (
    <MainLayout>
      <div>
        <h1>Homepage</h1>
        <div>
          <Link href="/shop/Create">
            <Button>Add Product</Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
