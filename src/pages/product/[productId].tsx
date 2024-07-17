// Import necessary modules and types
import { GetServerSideProps } from "next";
import MainLayout from "../componant/Layouts/MainLayout";
import React, { useEffect, useState } from "react";
import { Product, UpdateProductDTO, User } from "@/types/productType";
import productService from "@/services/productService";
import Breadcrumb from "../componant/Breadcrumb";
import { useRouter } from "next/router";
import { Button, Image } from "@nextui-org/react";
import { getSession, useSession } from "next-auth/react";

// Define props interface for the component
interface ProductDetailPageProps {
  product: Product;
  seller: User;
}

// Define the ProductDetailPage component
const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  seller,
}) => {
  const router = useRouter();
  const { data: session } = useSession(); // Use next-auth to get session data
  const [isCreator, setIsCreator] = useState<boolean>(false);

  useEffect(() => {
    setIsCreator(seller && seller.email === product.seller.email);
  }, [seller, product]);

  // Handle edit button click
  const handleEdit = () => {
    router.push(`/product/${product.id}/edit`);
  };

  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const handleColorChange = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleSizeChange = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  // Handle delete button click
  const handleDelete = async () => {
    try {
      await productService.deleteProduct(product.id);
      router.push("/products");
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  // Handle booking button click
  const handleBooking = () => {
    // Logic for booking action
    // Redirect or show booking modal/dialog
  };

  return (
    <div className="bg-gray-100">
      <MainLayout>
        <div className="container mx-auto p-10 mb-40">
          <Breadcrumb current={product.name} />
          <hr className="my-4 mx-10 border-gray-300" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left side - Product Image */}
        <div className="mr-10">
          {product.imageUrl && (
            <div className="mb-4">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={300}
                height={200}
                className="rounded-lg shadow-md"
              />
            </div>
          )}

          {/* Gallery Images */}
          {product.imageUrls.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {product.imageUrls.map((imageUrl, index) => (
                <div key={index} className="rounded-lg shadow-md">
                  <Image
                    src={imageUrl}
                    alt={`${product.name}-image-${index}`}
                    width={100}
                    height={100}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

{/* Right side - Product Details */}
<div>
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
          <p>{product.description}</p>
          <p className="mt-4 text-gray-600">Price: {product.price}</p>

          {/* Colors */}
          <div className="mt-4">
            <span className="text-gray-700">Select colors:</span>
            <div className="flex mt-2">
              {['Black', 'White', 'Blue', 'Red', 'Green', 'Pink', 'Grey'].map((color) => (
                <label key={color} className="mr-4">
                  <input
                    type="checkbox"
                    value={color}
                    checked={selectedColors.includes(color)}
                    onChange={() => handleColorChange(color)}
                    className="mr-1"
                  />
                  {color}
                </label>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mt-4">
            <span className="text-gray-700">Select sizes:</span>
            <div className="flex mt-2">
              {['S', 'M', 'L', 'XL', '2XL', '3XL'].map((size) => (
                <label key={size} className="mr-4">
                  <input
                    type="checkbox"
                    value={size}
                    checked={selectedSizes.includes(size)}
                    onChange={() => handleSizeChange(size)}
                    className="mr-1"
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>              {/* Action buttons based on user role */}
              {isCreator ? (
                <div className="flex gap-4 mt-4">
                  <Button
                    onClick={handleEdit}
                    className="bg-blue-500 text-white"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={handleDelete}
                    className="bg-red-500 text-white"
                  >
                    Delete
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleBooking}
                  className="bg-green-500 text-white mt-4"
                >
                  Book Now
                </Button>
              )}
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

// Server-side function to fetch product data based on the productId
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { productId } = context.params as { productId: string };
  const product = await productService.fetchProduct(productId);
  // Example: Assuming you have session and user data from next-auth
  const session = await getSession(context);

  // Pass product and currentUser data as props to the component
  return {
    props: {
      product,
    },
  };
};

export default ProductDetailPage;
