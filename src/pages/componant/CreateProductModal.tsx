import React, { ChangeEvent, ChangeEventHandler } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import Link from "next/link";

interface Props {
  isOpen?: boolean;
  onClose: () => void;

  setImageProduct: (value: string) => void;
}

export default function CreateProductModal({ isOpen, onClose }: Props) {
  const handleSelectFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const fileReader = new FileReader();

      fileReader.onload = (event) => {
        setImageProduct(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onClose} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">
                Add your product
              </ModalHeader>
              <ModalBody className="text-black">
                <div className="flex justify-center items-center flex-col p-4">
                  <label
                    htmlFor="uploadProduct"
                    className="border border-gray-300 rounded-lg w-24 h-24 flex items-center justify-center cursor-pointer hover:border-blue-500"
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
                        />
                      </svg>
                      <span className="text-sm">Upload</span>
                    </div>
                  </label>
                  <Input
                    id="uploadProduct"
                    type="file"
                    //hidden
                    accept="image/*"
                    onChange={handleSelectFile}
                    className="mt-4"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onClick={onClose}>
                  cancel
                </Button>
                <Button color="primary" onClick={onClose}>
                  <p>Done</p>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
function setImageProduct(arg0: string) {
  throw new Error("Function not implemented.");
}
