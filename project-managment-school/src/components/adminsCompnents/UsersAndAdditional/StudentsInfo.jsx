import React, { useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import { getStudentById } from "../../../apiCalls/studentCalls";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import { CgAdd } from "react-icons/cg";
import {
  addParent,
  addStudentInToParent,
  deleteStudentForParent,
} from "../../../apiCalls/parentCalls";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { FiDelete } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

function StudentsInfo() {
  const [student, setStudent] = useState({});
  const { studentParams } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure(); // use onClose instead of onOpenChange
  const [parent, setParent] = useState({});
  const [isParent, setIsParent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const fetchStudent = async () => {
    const response = await getStudentById(studentParams);
    setStudent(response);
  };
  useEffect(() => {
    fetchStudent();
  }, [studentParams]);

  const addParentApi = async (parentData) => {
    try {
      const newParent = await addParent(parentData);
      console.log("Parent added:", newParent);
    } catch (error) {
      console.error("Error adding parent:", error);
    }
  };

  const handleAddParent = async (event) => {
    event.preventDefault();

    const response = await addStudentInToParent(
      event.target.phoneNumber.value,
      studentParams
    );
    console.log(response);
    if (response.message !== "Parent") {
      fetchStudent();
      Swal.fire({
        icon: "success",
        title: "تمت الاضافة بنجاح",
        showConfirmButton: false,
        timer: 1500,
      });
      onClose();
    } else {
      setIsParent(true);
    }
    if (isParent) {
      const parentData = {
        fullName: event.target.fullName.value,
        phoneNumber: event.target.phoneNumber.value,
        email: event.target.email.value,
        password: event.target.password.value,
        studentId: studentParams,
      };
      addParentApi(parentData);
      fetchStudent();
      Swal.fire({
        icon: "success",
        title: "تمت الاضافة بنجاح",
        showConfirmButton: false,
        timer: 1500,
      });
      onClose();
    }

    // Close the modal after submission
  };
  const deleteParent = async () => {
    console.log("student.id", student.id);
    console.log("student.parent.id", student.parent.id);
    const response = await deleteStudentForParent(
      student.id,
      student.parent.id
    );
    console.log(response);
    fetchStudent();
  };
  const handleDeleteParent = async () => {
    Swal.fire({
      title: "هل انت متأكد؟",
      text: "لن تتمكن من التراجع عن هذا الاجراء!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم, احذف!",
      cancelButtonText: "الغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteParent();
        Swal.fire("تم الحذف!", "تم حذف الولي بنجاح.", "success");
      }
    });
  };

  return (
    <div>
      <div className="md:flex justify-start gap-10 items-start">
        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold my-5">معلومات التلميذ</h1>
          <div className="h-14 px-8 py-4 my-3 rounded-lg border border-black/20">
            <div className="text-right text-[#242c31] text-base font-semibold font-['Cairo'] leading-normal">
              {student?.fullName}
            </div>
          </div>
          <div className="h-14 px-8 py-4 my-5 rounded-lg border border-black/20">
            <div className="text-right text-[#242c31] text-base font-semibold font-['Cairo'] leading-normal">
              {student?.birthDay?.split("T")[0]}
            </div>
          </div>
          <div className="h-14 px-8 py-4 my-3 rounded-lg border border-black/20">
            <div className="text-right flex justify-between  gap-5 items-center  text-[#242c31] text-base font-semibold font-['Cairo'] leading-normal">
              {student.parent ? (
                <div>{student.parent.fullName}</div>
              ) : (
                "لا يوجد ولي أمر"
              )}
              {student.parent && (
                <div onClick={handleDeleteParent}>
                  <MdDelete
                    className="
                  text-red-500
                  text-2xl
                  cursor-pointer
                  
                  bg-red-100
                  p-1
                 
                  rounded-full
                  w-7 
                  h-7
                  
                  "
                  />
                </div>
              )}
            </div>
          </div>
          {!student?.parent && (
            <Button onClick={onOpen} size="lg" color="primary">
              اضافة ولي
              <CgAdd />
            </Button>
          )}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
              <ModalHeader className="flex flex-col gap-1">
                Add Parent
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleAddParent} id="parentForm">
                  <Input
                    className="my-2"
                    type="text"
                    name="fullName"
                    placeholder="اسم الولي"
                    required
                  />
                  <Input
                    className="my-2"
                    type="text"
                    name="phoneNumber"
                    placeholder="رقم الولي"
                    required
                  />

                  {isParent && (
                    <div>
                      <Input
                        className="my-2"
                        type="email"
                        name="email"
                        placeholder="ايميل الولي"
                      />
                      <Input
                        className="my-2"
                        placeholder="كلمة السر"
                        name="password"
                        type={isVisible ? "text" : "password"}
                        endContent={
                          <button
                            type="button"
                            onClick={toggleVisibility}
                            aria-label="toggle password visibility"
                          >
                            {isVisible ? (
                              <FaEye className="text-2xl text-default-400" />
                            ) : (
                              <FaEyeSlash className="text-2xl text-default-400" />
                            )}
                          </button>
                        }
                      />
                    </div>
                  )}

                  {!isParent && (
                    <Button
                      className="my-2"
                      color="primary"
                      variant="light"
                      type="submit"
                    >
                      هل الولي مسجل بالفعل؟
                    </Button>
                  )}
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  الغاء
                </Button>
                <Button color="primary" type="submit" form="parentForm">
                  اضافة
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
        <div>
          <h1 className="text-2xl font-bold my-5">
            الفصول التي ينتمي إليها التلميذ
          </h1>
          {student?.groups?.map((group) => (
            <div
              key={group.id}
              className="w-fit flex justify-end my-3 gap-4 items-center"
            >
              <div className="w-fit cursor-pointer hover:border-none hover:bg-slate-300 h-16 px-8 py-4 rounded-2xl border border-black justify-center items-center gap-2 inline-flex">
                <div className="text-right text-gray-800 text-2xl font-semibold font-['Cairo'] leading-9">
                  {group.name}
                </div>
              </div>
              <div className="text-right text-[#429661] text-xl font-semibold font-['Cairo'] leading-normal">
                {group.numberOfSessions} حصة
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentsInfo;
