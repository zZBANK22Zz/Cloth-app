import React, { useState } from "react";
import {
  Modal,
  Button,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Product } from "@/types/productType";
import productService from "@/services/productService";

interface EditProductModalProps {
  product: Product;
  onClose: () => void;
  isOpen: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  product,
  onClose,
  isOpen,
}) => {
  const [editedProduct, setEditedProduct] = useState<Product>({ ...product });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await productService.updateProduct(editedProduct.id, editedProduct);
      onClose(); // Close modal after update
      // Optionally, add success feedback or reload products
    } catch (error) {
      console.error("Error updating product:", error);
      // Handle error scenario
    }
  };

  return (
    <div className="h-full">
      <Modal
        isOpen
        onClose={onClose}
        aria-labelledby="edit-product-modal"
      >
        <ModalHeader>Edit Product</ModalHeader>
        <ModalContent>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={editedProduct.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={editedProduct.price}
              onChange={handleInputChange}
            />
          </label>
          {/* Add more fields as needed */}
        </ModalContent>
        <ModalFooter>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
          <Button onClick={onClose} color="danger">
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EditProductModal;
