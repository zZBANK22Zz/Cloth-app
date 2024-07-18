// Import necessary modules and types
import { GetServerSideProps } from "next";
import MainLayout from "../componant/Layouts/MainLayout";
import React, { useState } from "react";
import { Product, User } from "@/types/productType";
import productService from "@/services/productService";
import Breadcrumb from "../componant/Breadcrumb";
import { Button, Image } from "@nextui-org/react";
import { getSession } from "next-auth/react";

// Define props interface for the component
type ProductDetailPageProps = {
  product: Product;
  seller: User;
}

// Define the ProductDetailPage component
const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product }) => {
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

  // Handle booking button click
  const handleBooking = () => {
    console.log("Booking product: " + product.name);
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
              <p className="text-gray-400">{product.seller.name}</p>
              <p>{product.description}</p>
              <p className="mt-4 text-gray-600">Price: {product.price}</p>
              {/* Colors */}
              {/* Colors */}
              {product.color && product.color.length > 0 && (
                <div className="mt-4">
                  <span className="text-gray-700">Select colors:</span>
                  <div className="flex mt-2">
                    {product.color.map((color) => (
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
              )}
              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-4">
                  <span className="text-gray-700">Select sizes:</span>
                  <div className="flex mt-2">
                    {product.sizes.map((size) => (
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
                </div>
              )}
              {/* Action buttons based on user role */}
              <Button
                onClick={handleBooking}
                className="bg-green-500 text-white mt-4"
              >
                Book Now
              </Button>
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
