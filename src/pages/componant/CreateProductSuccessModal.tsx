import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import Link from "next/link";

interface Props {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export default function CreateProductSuccessModal(props: Props) {
  return (
    <div>
      <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">
                Create product successfully
              </ModalHeader>
              <ModalBody className="text-black">
                <p>You have successfully created a product</p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onClick={onClose}>
                  Stay in this page
                </Button>
                <Button color="primary">
                  <Link href="/shop">View your product</Link>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}