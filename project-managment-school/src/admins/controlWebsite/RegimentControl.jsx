import {
  Button,
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";

function RegimentControl() {
  const [name, setName] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");
  const handleAddName = () => {
    // Handle the addition of the name (e.g., save it, display it, etc.)
    console.log("Added name:", name);
    setName(""); // Clear the input field after adding the name
  };

  return (
    <div>
      <div className="flex justify-between items-center ">
        <h1
          className="
        text-right
        text-gray-800
        text-2xl
        font-semibold
        font-['Cairo']
        leading
        my-5
      "
        >
          {" "}
          القاعات{" "}
        </h1>
        <Button onPress={onOpen}>اضافة قاعة</Button>

        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          scrollBehavior="inside"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Modal Title
                </ModalHeader>

                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    الغاء
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    اضافة
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}

export default RegimentControl;
