import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MainLayout from '../componant/Layouts/MainLayout';
import Breadcrumb from '../componant/Breadcrumb';
import Input from 'postcss/lib/input';
import { Button, Image } from '@nextui-org/react';
import productService from '@/services/productService';
import { Product, UpdateProductDTO } from '../../types/productType';

const Edit = () => {
  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState<Partial<Product>>({});
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    if (productId) {
      productService.fetchProduct(productId as string)
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching product:', error);
          setLoading(false);
        });
    }
  }, [productId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSelectImageProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProduct({ ...product, imageUrl: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handleSelectGalleryImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const galleryImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setProduct({ ...product, imageUrls: galleryImages });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const update: UpdateProductDTO = {
      name: product.name,
      description: product.description,
      price: product.price,
      color: product.color,
      sizes: product.sizes,
      imageUrl: product.imageUrl,
      imageUrls: product.imageUrls,
    }
    if (productId as string) {
      productService.updateProduct(productId as string, update)
        .then(() => {
          console.log('Product updated successfully');
          router.push(`/product/MyProduct`);
        })
        .catch((error) => {
          console.error('Error updating product:', error);
        });
    }
  };

  if (loading) return <div>Loading...</div>;


  return (
    <div className="bg-gray-100">
      <MainLayout>
        <div className="container mx-auto p-10 mb-40">
          <Breadcrumb current="Update Product" />
          <hr className="my-4 mx-10 border-gray-300" />
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Image upload section */}
              <div className="flex flex-start">
                <div className="flex flex-col gap-4">
                  <h1 className="font-bold text-black my-4">Image</h1>
                  <div className="flex flex-col items-center gap-4 w-full">
                    {product.imageUrl ? (
                      <Image src={product.imageUrl} alt="Product" />
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
                    {product.imageUrls && product.imageUrls.length > 0 ? (
                      <div className="grid grid-cols-3 gap-4">
                        {product.imageUrls.map((url, index) => (
                          <Image src={url} key={index} alt={`Gallery image ${index + 1}`} />
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
                <input
                  name="name"
                  type="text"
                  placeholder="Product name"
                  className="border border-gray-300 rounded-lg p-2"
                  value={product.name || ''}
                  onChange={handleChange}
                />
                <input
                  name="description"
                  type="text"
                  placeholder="Product description"
                  className="border border-gray-300 rounded-lg p-2"
                  value={product.description || ''}
                  onChange={handleChange}
                />
                <input
                  name="category"
                  type="text"
                  placeholder="Select a category"
                  className="border border-gray-300 rounded-lg p-2"
                  value={product.category || ''}
                  onChange={handleChange}
                />
                <input
                  name="price"
                  type="number"
                  placeholder="Product price (THB)"
                  className="border border-gray-300 rounded-lg p-2"
                  value={product.price || ''}
                  onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="mt-4 bg-green-500 text-white"
            >
              Update
            </Button>
          </form>
        </div>
      </MainLayout>
    </div>
  );
};

export default Edit;