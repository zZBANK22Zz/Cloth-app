import React, { ChangeEventHandler, useState } from "react";
import {
  Modal,
  Button,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
} from "@nextui-org/react";
import { Product } from "@/types/productType";
import productService from "@/services/productService";
import MainLayout from "./Layouts/MainLayout";
import Breadcrumb from "./Breadcrumb";
import ImagePicker from "./ImagePicker";
import fileService from "@/services/fileservice";

interface Props {
  product: Product;
  onClose: () => void;
  isOpen: () => void;

  name: string,
  description: string,
  category: string,
  price: number,
  colors: string[],
  sizes: string[],

  setName: (value: string) => void,
  setDescription: (value: string) => void,
  setCategory: (value: string) => void,
  setPrice: (value: number) => void,
  setColors: (value: string[]) => void,
  setSizes: (value: string[]) => void,
}

export default function UpdateProductModal({
  name,
  description,
  category,
  price,
  colors,
  sizes,

  setName,
  setDescription,
  setCategory,
  setPrice,
  setColors,
  setSizes
}: Props) {

  const handleChangeName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  }
  const handleChangeDescription: ChangeEventHandler<HTMLInputElement> = (e) => {
    setDescription(e.target.value);
  }
  const handleChangeCategory: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCategory(e.target.value);
  }
  const handleChangePrice: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPrice(Number(e.target.value));
  }

  return (
    <div className="bg-gray-100">
      <MainLayout>
        <div className="container mx-auto p-10 mb-40">
          <Breadcrumb current="Create" />
          <hr className="my-4 mx-10 border-gray-300" />

          <form className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Image upload section */}

              {/* Product details section */}
              <div className="flex flex-col gap-4">
                <h1 className="font-bold text-black my-4">Product Details</h1>
                <Input
                  name="name"
                  type="text"
                  value={name}
                  placeholder="Product name"
                  className="border border-gray-300 rounded-lg p-2"
                />
                <Input
                  name="description"
                  type="text"
                  value={description}
                  placeholder="Product description"
                  className="border border-gray-300 rounded-lg p-2"
                />
                <Input
                  name="category"
                  type="text"
                  value={category}
                  placeholder="Select a category"
                  className="border border-gray-300 rounded-lg p-2"
                />
                <Input
                  name="price"
                  type="text"
                  value={price.toString()}
                  placeholder="Product price (THB)"
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
                          className="form-checkbox h-4 w-4 checked:bg-green-500"
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

            <Button type="submit" className="mt-4 bg-green-500 text-white">
              Create
            </Button>
          </form>
        </div>
      </MainLayout>{" "}
    </div>
  );
};


