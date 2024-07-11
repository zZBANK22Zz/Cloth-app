import Link from "next/link";
import MainLayout from "./componant/Layouts/MainLayout";
import React from "react";
import { Button } from "@nextui-org/react";

const HomePage = () => {
  return (
    <MainLayout>
      <div>
        <div className="flex justify-end">
          <div className="mt-3 mx-4">
            <Link href="/shop/Create">
              <Button className="bg-gray-200">Add Product</Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
