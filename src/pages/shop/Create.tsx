import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import productService from "@/services/productService";
import { createProductDTO } from "@/types/productType";
import MyNavbar from "../componant/Navbar";
import Breadcrumb from "../componant/Breadcrumb";
import Footer from "../componant/Footer";

const CreateProductPage = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const router = useRouter();

  const handleCreateProduct = async (event: React.FormEvent) => {
    event.preventDefault();
    const newProduct: createProductDTO = {
      name: productName,
      description,
      category,
      price: parseFloat(price),
      colors,
      sizes,
      imageUrl: "",
      imageUrls: [],
    };

    try {
      await productService.createProduct(newProduct);
      router.push("/index");
    } catch (error) {
      console.error("Failed to create product", error);
    }
  };

  return (
    <div className="bg-gray-100">
      <MyNavbar />
      <div className="container mx-auto p-10 mb-40">
        <Breadcrumb current="Create" />
        <hr className="my-4 mx-10 border-gray-300" />

        <form onSubmit={handleCreateProduct} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Image upload section */}
            <div className="flex flex-start">
              <div className="flex flex-col gap-4">
                <h1 className="font-bold text-black my-4">Image</h1>
                <div className="flex flex-col items-center gap-4 w-full">
                  <label
                    htmlFor="uploadProductImage"
                    className="border border-gray-300 rounded-lg w-full h-24 flex items-center justify-center cursor-pointer hover:border-green-500"
                  >
                    <div className="text-center">
                      {/* Plus icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mx-auto mb-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                          color="rgb(156 163 175)"
                        />
                      </svg>
                      {/* text in the input box. */}
                      <span className="text-sm text-gray-400">
                        Select an image
                      </span>
                    </div>
                  </label>
                  <input
                    id="uploadProductImage"
                    type="file"
                    hidden
                    accept="image/*"
                    // handle image upload here
                  />
                </div>

                {/* Gallery upload section */}
                <div className="flex flex-col items-center gap-4 w-full my-10">
                  <div className="flex flex-col items-start gap-4 w-full">
                    <h1 className="font-bold text-black">Gallery</h1>
                  </div>
                  <label
                    htmlFor="uploadProductGallery"
                    className="border border-gray-300 rounded-lg w-full h-24 flex items-center justify-center cursor-pointer hover:border-blue-500"
                  >
                    <div className="text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mx-auto mb-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                          color="rgb(156 163 175)"
                        />
                      </svg>
                      <span className="text-sm text-gray-400">
                        Select images
                      </span>
                    </div>
                  </label>
                  <input
                    id="uploadProductGallery"
                    type="file"
                    hidden
                    accept="image/*"
                    multiple
                    // handle gallery upload here
                  />
                </div>
              </div>
            </div>
            {/* Product details section */}
            <div className="flex flex-col gap-4">
              <h1 className="font-bold text-black my-4">Product Details</h1>
              <Input
                name="name"
                type="text"
                placeholder="Product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="border border-gray-300 rounded-lg p-2"
              />
              <Input
                name="description"
                type="text"
                placeholder="Product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 rounded-lg p-2"
              />
              <Input
                name="category"
                type="text"
                placeholder="Select a category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-gray-300 rounded-lg p-2"
              />
              <Input
                name="price"
                type="text"
                placeholder="Product price (THB)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border border-gray-300 rounded-lg p-2"
              />

              {/* Colors and Sizes */}
              <div className="flex flex-col">
                <span className="mb-2 text-gray-500">Select colors:</span>
                <div className="flex gap-2 text-black">
                  {[
                    "Black",
                    "White",
                    "Blue",
                    "Red",
                    "Green",
                    "Pink",
                    "Grey",
                  ].map((color) => (
                    <label key={color} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        value={color}
                        checked={colors.includes(color)}
                        color="silver"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setColors([...colors, color]);
                          } else {
                            setColors(colors.filter((c) => c !== color));
                          }
                        }}
                        className="form-checkbox h-4 w-4"
                      />
                      {color}
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="mb-2 text-gray-500">Select sizes:</span>
                <div className="flex gap-2 text-black">
                  {["S", "M", "L", "XL", "2XL", "3XL"].map((size) => (
                    <label key={size} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        value={size}
                        checked={sizes.includes(size)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSizes([...sizes, size]);
                          } else {
                            setSizes(sizes.filter((s) => s !== size));
                          }
                        }}
                        className="form-checkbox h-4 w-4"
                      />
                      {size}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Button type="submit" color="primary" className="mt-4">
            Create
          </Button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateProductPage;