import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  deleteTeacherApi,
  getTeacherById,
} from "../../../apiCalls/teacherCalls";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function TeacherInfo() {
  const { teacherParams } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure(); // use onClose instead of onOpenChange
  const [Teacher, setTeacher] = useState({});
  const [isTeacher, setIsTeacher] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const fetchTeacher = async () => {
    const response = await getTeacherById(teacherParams);
    setTeacher(response);
  };
  useEffect(() => {
    fetchTeacher();
  }, []);

  const deleteTeacher = async () => {
    console.log("student.id", Teacher.id);

    // const response = await deleteTeacherApi({
    //   id: Teacher.id,
    // });
    // console.log(response);
    fetchTeacher();
  };
  const handleDeleteTeacher = async () => {
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
        deleteTeacher();
        Swal.fire("تم الحذف!", "تم حذف الولي بنجاح.", "success");
      }
    });
  };

  return (
    <div>
      <div className="md:flex justify-start gap-10 items-start">
        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold my-5">معلومات الاستاذ</h1>

          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              الاسم الكامل
            </label>
            <Input
              id="fullName"
              value={Teacher?.fullName || ""}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              رقم الهاتف
            </label>
            <Input
              id="phoneNumber"
              value={Teacher?.phoneNumber || ""}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              البريد الإلكتروني
            </label>
            <Input
              id="email"
              value={Teacher?.email || ""}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              كلمة المرور
            </label>
            <Input
              id="password"
              value={Teacher?.password || ""}
              disabled
              type={isVisible ? "text" : "password"}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
        </div>
        <div>
          <h1 className="text-2xl font-bold my-5"> الافواج</h1>
          {Teacher?.groups?.map((group) => (
            <div
              key={group.id}
              className="w-fit flex justify-end my-3 gap-4 items-center"
            >
              <div className="w-fit cursor-pointer hover:border-none hover:bg-slate-300 h-16 px-8 py-4 rounded-2xl border border-black justify-center items-center gap-2 inline-flex">
                <div className="text-right text-gray-800 text-2xl font-semibold font-['Cairo'] leading-9">
                  {group.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeacherInfo;
