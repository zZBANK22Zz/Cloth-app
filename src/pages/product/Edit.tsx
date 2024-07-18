import { GetServerSideProps } from "next";
import MainLayout from "@/pages/componant/Layouts/MainLayout";
import React, { useState } from "react";
import { Product } from "@/types/productType";
import productService from "@/services/productService";
import { Button, Image } from "@nextui-org/react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

interface EditProductPageProps {
  product: Product;
}

const EditProductPage: React.FC<EditProductPageProps> = ({ product }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [imageUrl, setImageUrl] = useState(product.imageUrl);
  const router = useRouter();

  const handleSave = async () => {
    try {
      await productService.updateProduct(product.id, {
        name,
        price,
        description,
        imageUrl,
      });
      router.push("/my-products");
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto p-10 mb-40">
        <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Price
          </label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Image URL
          </label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </MainLayout>
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
