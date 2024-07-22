import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Image, useDisclosure } from "@nextui-org/react";
import MainLayout from "../componant/Layouts/MainLayout";
import { Product } from "@/types/productType";
import productService from "@/services/productService";
import EditProductModal from "../componant/EditProductModal";
import router from "next/router";
import ConfirmModal from "../componant/ConfirmModal";
import { useSession } from "next-auth/react";

const MyProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const confirmModalDisclosure = useDisclosure();
  
  const { data: session } = useSession();  const handleEdit = (product: Product) => {
    router.push("/product/Edit");
    setSelectedProduct(product);
    //setIsEditModalOpen(true);
  };

  const handleDelete = async (productId: string) => {
    const selectedProduct = products.find((product) => product.id === productId);
    if (selectedProduct) {
      setSelectedProduct(selectedProduct);
      confirmModalDisclosure.onOpen();
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedProduct && selectedProduct.id) {
      try {
        await productService.deleteProduct(selectedProduct.id);
        setProducts(products.filter((product) => product.id !== selectedProduct.id));
        confirmModalDisclosure.onClose();
        setSelectedProduct(null); // Reset selected product after deletion
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    } else {
      console.error("No product selected or product ID is missing.");
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data } = await productService.fetchMyProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <MainLayout>
      <div className="px-40 py-8">
        <div>
          <div className="flex justify-between">
            <h1 className="text-lg font-bold mb-4 text-black">My Products</h1>
            <Link href="/product/Create">
              <Button className="bg-gray-200">Add Product</Button>
            </Link>
          </div>
        </div>
        <hr className="my-4 border-gray-300" />
        <div className="grid grid-cols-5 gap-3 mb-4">
          {products.map((product) => (
            <div key={product.id} className="relative">
              <div className="flex flex-col relative overflow-hidden h-auto text-foreground box-border bg-content1 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-small rounded-large transition-transform-background motion-reduce:transition-none w-full border border-transparent hover:border-primary">
                <div className="relative flex w-full flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left subpixel-antialiased overflow-visible p-0">
                  <div className="relative shadow-black/5 shadow-small rounded-large">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={100}
                      height={100}
                      className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-small transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large w-full object-cover h-[140px]"
                      data-loaded="true"
                    />
                  </div>
                </div>
                <div className="p-3 h-auto flex w-full overflow-hidden color-inherit subpixel-antialiased rounded-b-large text-small flex-col items-start">
                  <div className="w-full flex justify-between mb-2">
                    <b>{product.name}</b>
                    <p className="text-default-500">{product.price}฿</p>
                  </div>
                  <div className="flex space-x-1 items-center text-gray-400">
                    <span
                      tabIndex={-1}
                      className="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-tiny bg-default text-default-foreground rounded-full w-4 h-4"
                    >
                      <span
                        aria-label="avatar"
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-inherit w-full h-full"
                        role="img"
                      ></span>
                    </span>
                    <p>{product.seller.name}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      color="primary"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      color="danger"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {isEditModalOpen && selectedProduct && (
          <EditProductModal
            isOpen={() => isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            product={selectedProduct}
          />
        )}
        <ConfirmModal
          isOpen={confirmModalDisclosure.isOpen}
          onOpenChange={confirmModalDisclosure.onOpenChange}
          onDelete={handleConfirmDelete}
        />
      </div>
    </MainLayout>
  );
};

export default MyProduct;
function setConfirmModalOpen(arg0: boolean) {
  throw new Error("Function not implemented.");
}

