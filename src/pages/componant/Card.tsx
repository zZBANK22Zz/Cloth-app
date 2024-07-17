import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  Image,
  Link,
} from "@nextui-org/react";
import productService from "@/services/productService";
import { Product } from "@/types/productType";
import { Route } from "lucide-react";
import router, { useRouter } from "next/router";

interface ProductCardProps {
  handleEdit: (productId: string) => void;
  productId: string;
}

const MyCard: React.FC<ProductCardProps> = ({ handleEdit, productId }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productService.fetchProducts();
        setProducts(response.data); // Assuming your API response has a 'data' field with an array of products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = () => {
    router.push(`/product/${productId}`);
    handleEdit(productId);
  };

  return (
    <div>
      <h1 className="px-80 font-bold">All Product</h1>
      <div className="flex justify-center items-start h-screen my-10">
        <div className="max-w-7xl w-full gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((item, index) => (
            <Card
              shadow="sm"
              key={index}
              isPressable
              onClick={handleClick}
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.name}
                  className="w-full object-cover h-[140px]"
                  src={item.imageUrl}
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{item.name}</b>
                <p className="text-default-500">{item.price}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyCard;