import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

interface Props {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  onDelete?: () => void;
}

export default function ConfirmModal(props: Props) {
  return (
    <div>
      <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">
                <h1>Confirm Delete?</h1>
              </ModalHeader>
              <ModalBody className="text-black">
                <p>Are you sure you want to delete this product?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="danger" onPress={props.onDelete}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}