import React, { useState } from "react";
import MyNavbar from "./componant/Navbar";
import Footer from "./componant/Footer";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import CreateProductModal from "./componant/CreateProductModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productImage, setProductImage] = useState("");

  const handleSetproductImage = (image: string) => {
    setProductImage(image);
  }

  const handleCloseSetproductImage = () => {
    console.log("Close product image");
  }

  const handleCreateProduct = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <main className="bg-slate-300 min-h-screen">
        <MyNavbar />
        <div className="mt-6 ml-10">
          <h1 className="text-black font-bold text-2xl mb-4">All Clothes</h1>
        </div>

        {/* <div className="px-10">
        <MyCard />
      </div> */}

        <div>
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 p-4 px-10">
            <Card shadow="sm" key={1} isPressable onClick={handleCreateProduct}>
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

        {/* <div className="flex justify-start mt-4 mx-12">
        <ul className="flex list-none p-0">
          {[...Array(10)].map((_, index) => (
            <li key={index}>
              <button
                className={`px-4 py-2 mx-1 ${
                  currentPage === index + 1
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-700"
                } rounded-xl`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div> */}
      </main>
      <Footer></Footer>
      {isModalOpen && (
        <CreateProductModal
          isOpen={isModalOpen}
          onClose={handleClose}
          
          setImageProduct={handleSetproductImage}
        />
      )}
    </div>
  );
}
