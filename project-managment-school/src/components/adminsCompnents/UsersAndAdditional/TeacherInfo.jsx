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
  updateTeacher,
} from "../../../apiCalls/teacherCalls";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";

function TeacherInfo() {
  const { teacherParams } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [Teacher, setTeacher] = useState({});
  const [isTeacher, setIsTeacher] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validationSchema = Yup.object({
    fullName: Yup.string().trim().required("اسم الاستاذ مطلوب"),
    phoneNumber: Yup.string().required("رقم الهاتف مطلوب"),
    email: Yup.string()
      .email("بريد إلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
    password: Yup.string().required("كلمة المرور مطلوبة"),
  });

  const fetchTeacher = async () => {
    const response = await getTeacherById(teacherParams);
    setTeacher(response);
  };

  useEffect(() => {
    fetchTeacher();
  }, [teacherParams]);

  const onEditClose = () => {
    setIsEditModalOpen(false);
  };

  const handleEditSubmit = async (values) => {
    console.log(values);
    
    try {
      const response = await updateTeacher({
        id: Teacher.id,
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
        email: values.email,
        password: values.password,
      });

      if (response) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "تم التعديل بنجاح",
          timer: 1500,
          confirmButtonText: "حسناً",
        }).then(() => {
          fetchTeacher();
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "حدث خطأ",
          text: "لم يتم التعديل",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating teacher:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "حدث خطأ",
        text: "لم يتم التعديل",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="md:flex justify-start gap-10 items-start">
        <div className="md:w-1/2">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold my-5">معلومات الاستاذ</h1>
            <Button
              isIconOnly
              color="primary"
              variant="light"
              onClick={() => {
                setEditForm({
                  fullName: Teacher.fullName,
                  phoneNumber: Teacher.phoneNumber,
                  email: Teacher.email,
                  password: Teacher.password,
                });
                setIsEditModalOpen(true);
              }}
              className="mt-5"
            >
              <MdEdit className="text-xl" />
            </Button>
          </div>

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

          {/* Edit Teacher Modal */}
          <Modal isOpen={isEditModalOpen} onClose={onEditClose}>
            <ModalContent>
              <ModalHeader className="flex flex-col gap-1">
                تعديل الاستاذ
              </ModalHeader>
              <ModalBody>
                <Formik
                  initialValues={editForm}
                  onSubmit={handleEditSubmit}
                  validationSchema={validationSchema}
                >
                  {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} id="editForm">
                      <div className="space-y-4">
                        <div>
                          <Input
                            type="text"
                            name="fullName"
                            placeholder="اسم الاستاذ"
                            value={editForm.fullName}
                            onChange={handleInputChange}
                            required
                          />
                          <ErrorMessage
                            name="fullName"
                            component="div"
                            className="text-red-500"
                          />
                        </div>

                        <div>
                          <Input
                            type="text"
                            name="phoneNumber"
                            placeholder="رقم الهاتف"
                            value={editForm.phoneNumber}
                            onChange={handleInputChange}
                            required
                          />
                          <ErrorMessage
                            name="phoneNumber"
                            component="div"
                            className="text-red-500"
                          />
                        </div>

                        <div>
                          <Input
                            type="email"
                            name="email"
                            placeholder="البريد الإلكتروني"
                            value={editForm.email}
                            onChange={handleInputChange}
                            required
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500"
                          />
                        </div>

                        <div>
                          <Input
                            name="password"
                            placeholder="كلمة المرور"
                            type={isVisible ? "text" : "password"}
                            value={editForm.password}
                            onChange={handleInputChange}
                            required
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
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                      </div>
                    </form>
                  )}
                </Formik>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="light" onClick={onEditClose}>
                  الغاء
                </Button>
                <Button color="primary" type="submit" form="editForm">
                  حفظ
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
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
