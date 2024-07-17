import { GetServerSideProps } from "next";
import MainLayout from "../componant/Layouts/MainLayout";
import React, { useEffect, useState } from "react";
import { Product, UpdateProductDTO, User } from "@/types/productType";
import productService from "@/services/productService";
import { useRouter } from "next/router";
import UpdateProductSuccessModal from "../componant/UpdateProductSuccess";
import ImagePicker from "../componant/ImagePicker";
import Breadcrumb from "../componant/Breadcrumb";
import { Input, Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import axios from "axios";

type EditProductPageProps = {
  product: Product;
  currentUser: User;
};

const EditProductPage: React.FC<EditProductPageProps> = ({ product }) => {
  const session = useSession();
  const [form, setForm] = useState<UpdateProductDTO>({
    name: product.name,
    description: product.description,
    price: product.price,
    imageUrl: product.imageUrl,
    imageUrls: product.imageUrls,
    sizes: product.sizes,
    color: product.color,
  });
  const [imageUrl, setImageUrl] = useState<string>(product.imageUrl);
  const [galleryImageURLs, setGalleryImageURLs] = useState<string[]>(
    product.imageUrls
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [colors, setColors] = useState<string[]>(product.color);
  const [sizes, setSizes] = useState<string[]>(product.sizes);
  const router = useRouter();


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  

  const handleSelectImageProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
        setForm({ ...form, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectGalleryImages = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const urls = files.map((file) => URL.createObjectURL(file));
      setGalleryImageURLs(urls);
      setForm({ ...form, imageUrls: urls });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await productService.updateProduct(product.id, {
        ...form,
        color: colors,
        sizes,
      });
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  return (
    <div className="bg-gray-100">
      <MainLayout>
        <div className="container mx-auto p-10 mb-40">
          <Breadcrumb current="Edit" />
          <hr className="my-4 mx-10 border-gray-300" />

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Image upload section */}
              <div className="flex flex-start">
                <div className="flex flex-col gap-4">
                  <h1 className="font-bold text-black my-4">Image</h1>
                  <div className="flex flex-col items-center gap-4 w-full">
                    {imageUrl ? (
                      <ImagePicker previewUrl={imageUrl} />
                    ) : (
                      <label
                        htmlFor="uploadProductImage"
                        className="border border-gray-300 rounded-lg w-full h-24 flex items-center justify-center cursor-pointer hover:border-green-500"
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
                            Select an image
                          </span>
                        </div>
                      </label>
                    )}
                    <input
                      id="uploadProductImage"
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleSelectImageProduct}
                    />
                  </div>

                  {/* Gallery upload section */}
                  <div className="flex flex-col items-center gap-4 w-full my-10">
                    <div className="flex flex-col items-start gap-4 w-full">
                      <h1 className="font-bold text-black">Gallery</h1>
                    </div>
                    {galleryImageURLs.length > 0 ? (
                      <div className="grid grid-cols-3 gap-4">
                        {galleryImageURLs.map((url, index) => (
                          <ImagePicker previewUrl={url} key={index} />
                        ))}
                      </div>
                    ) : (
                      <label
                        htmlFor="uploadProductGallery"
                        className="border border-gray-300 rounded-lg w-full h-24 flex items-center justify-center cursor-pointer hover:border-green-500"
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
                    )}
                    <input
                      id="uploadProductGallery"
                      type="file"
                      hidden
                      accept="image/*"
                      multiple
                      onChange={handleSelectGalleryImages}
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
                  value={form.name}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2"
                />
                <Input
                  name="description"
                  type="text"
                  placeholder="Product description"
                  value={form.description}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2"
                />
                <Input
                  name="category"
                  type="text"
                  placeholder="Select a category"
                  value={form.category || ""}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2"
                />
                <Input
                  name="price"
                  type="text"
                  placeholder="Product price (THB)"
                  value={form.price !== undefined ? form.price.toString() : ""}                  onChange={(e) =>
                    setForm({ ...form, price: parseFloat(e.target.value) })
                  }
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
            php Copy code
            <Button type="submit" className="mt-4 bg-green-500 text-white">
              Save
            </Button>
          </form>
        </div>
      </MainLayout>
      <UpdateProductSuccessModal
        isOpen={isModalOpen}
        onOpenChange={() => setIsModalOpen(false)} productId={""}      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { productId } = context.params as { productId: string };
  const product = await productService.fetchProduct(productId);

  return {
    props: {
      product,
    },
  };
};

export default EditProductPage;
