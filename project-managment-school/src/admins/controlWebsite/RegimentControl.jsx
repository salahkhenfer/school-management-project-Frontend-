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
import React, { useEffect, useState } from "react";
import {
  addRegimentApi,
  deleteRegimentApi,
  getAllFreeRegiments,
  getAllRegiments,
} from "../../apiCalls/scheduleCalls";
import SmallCard from "../../components/adminsCompnents/Classes/SmallCard";
import { FiCrop, FiDelete } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

function RegimentControl() {
  const [name, setName] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [regiments, setRegiments] = useState([]);
  const handleAddName = () => {
    const addRegiment = async () => {
      const response = await addRegimentApi(name);
      console.log(response);
      getAllRegiment();
    };
    addRegiment();
  };

  const getAllRegiment = async () => {
    // Get all regiments from the API
    const regiments = await getAllRegiments();
    setRegiments(regiments);
  };
  useEffect(() => {
    getAllRegiment();
  }, []);

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
        <Button color="primary" onPress={onOpen}>
          اضافة قاعة
        </Button>

        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          scrollBehavior="inside"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  اضافة قاعة
                </ModalHeader>

                <ModalBody>
                  <Input
                    className="my-2"
                    type="text"
                    placeholder="اسم القاعة"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </ModalBody>

                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    الغاء
                  </Button>
                  <Button
                    onClick={handleAddName}
                    color="primary"
                    onPress={onClose}
                  >
                    اضافة
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
      <div>
        {regiments.map((regiment) => (
          <div key={regiment.id} className=" flex justify-start items-center ">
            <SmallCard text={regiment.name} notNavigate={true} />

            <MdDelete
              onClick={async () => {
                const response = await deleteRegimentApi(regiment.id);
                if (response) {
                  Swal.fire({
                    title: "هل انت متأكد من حذف القاعة",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "نعم",
                    cancelButtonText: "لا",
                    confirmButtonColor: "red",
                    cancelButtonColor: "green",
                    reverseButtons: true,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      console.log(response);
                      getAllRegiment();
                      Swal.fire({
                        icon: "success",
                        title: "تم الحذف بنجاح",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    }
                  });
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "حدث خطأ ما",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              }}
              className=" 
              text-red-500
              text-4xl
              cursor-pointer
              
              
              "
            />
          </div>
        ))}
      </div>
      {regiments.length == 0 && (
        <div className="flex justify-center items-center">
          <p className="text-2xl text-gray-800 font-semibold font-['Cairo']">
            لا توجد قاعات
          </p>
        </div>
      )}
    </div>
  );
}

export default RegimentControl;
