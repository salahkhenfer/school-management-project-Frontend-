import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  useDisclosure,
  AutocompleteItem,
  Autocomplete,
} from "@nextui-org/react";
import { CgAdd } from "react-icons/cg";
import {
  addParent,
  addStudentInToParent,
  deleteParentApi,
  deleteStudentFormParent,
  getParentById,
  updateParent,
} from "../../../apiCalls/parentCalls";
import { searchStudentApi } from "../../../apiCalls/studentCalls";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import Swal from "sweetalert2";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";

function ParentInfo() {
  const { parentParams } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [parent, setParent] = useState({});
  const [isParent, setIsParent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validationSchema = Yup.object({
    fullName: Yup.string().trim().required("اسم الولي مطلوب"),
    phoneNumber: Yup.string().required("رقم الهاتف مطلوب"),
    email: Yup.string()
      .email("بريد إلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
    password: Yup.string().required("كلمة المرور مطلوبة"),
  });

  const fetchParent = async () => {
    const response = await getParentById(parentParams);
    setParent(response);
  };

  useEffect(() => {
    fetchParent();
  }, [parentParams]);

  const onEditClose = () => {
    setIsEditModalOpen(false);
  };

  const handleEditSubmit = async (values) => {
    console.log();

    try {
      const response = await updateParent({
        id: parent.id,
        name: editForm.fullName,
        phone: editForm.phoneNumber,
        email: editForm.email,
        password: editForm.password,
      });

      if (response) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "تم التعديل بنجاح",
          timer: 1500,
          confirmButtonText: "حسناً",
        }).then(() => {
          fetchParent();
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
      console.error("Error updating parent:", error);
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
  useEffect(() => {
    fetchParent();
  }, []);

  const deleteParent = async () => {
    console.log("student.id", parent.id);

    const response = await deleteParentApi({
      parentId: parent.id,
    });
    console.log(response);
    fetchParent();
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
  const handleDeleteStudent = async (studentId) => {
    Swal.fire({
      title: "هل انت متأكد؟",
      text: "لن تتمكن من التراجع عن هذا الاجراء!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم, احذف!",
      cancelButtonText: "الغاء",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteStudentFormParent({
          parentId: parent.id,
          studentId: studentId,
        });

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "تم الحذف بنجاح",
            showConfirmButton: false,
            timer: 1500,
          });

          fetchParent(parentParams);
        } else {
          Swal.fire({
            icon: "error",
            title: "حدث خطأ ما",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };
  const handleStudentSearch = async (name) => {
    if (name === "") {
      setStudents([]);
      return;
    }
    console.log("name", name);
    try {
      const response = await searchStudentApi(name);
      setStudents(response);
    } catch (error) {
      console.error("Failed to search students:", error);
    }
  };
  return (
    <div>
      <div className="md:flex justify-start gap-10 items-start">
        <div className="md:w-1/2">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold my-5">معلومات الولي</h1>
            <Button
              isIconOnly
              color="primary"
              variant="light"
              onClick={() => {
                setEditForm({
                  fullName: parent.fullName,
                  phoneNumber: parent.phoneNumber,
                  email: parent.email,
                  password: parent.password,
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
              value={parent?.fullName || ""}
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
              value={parent?.phoneNumber || ""}
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
              value={parent?.email || ""}
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
              value={parent?.password || ""}
              disabled
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <Modal isOpen={isEditModalOpen} onClose={onEditClose}>
            <ModalContent>
              <ModalHeader className="flex flex-col gap-1">
                تعديل معلومات الولي
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
                            placeholder="اسم الولي"
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
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
              <ModalHeader className="flex flex-col gap-1">
                اضافة تلميذ للولي
              </ModalHeader>
              <ModalBody>
                <Autocomplete
                  size="sm"
                  label="ابحث عن تلميذ"
                  aria-label="ابحث عن تلميذ"
                  className="max-w-xs"
                  onInputChange={(e) => handleStudentSearch(e)}
                  value={student}
                  endContent={
                    <div
                      onClick={() => {
                        handleStudentSearch(student);
                      }}
                    >
                      <BiSearch className=" cursor-pointer text-2xl text-gray-950 text-default-400" />
                    </div>
                  }
                >
                  {students.map((item) => (
                    <AutocompleteItem
                      key={item.id}
                      onClick={() =>
                        addStudentInToParent(parent.phoneNumber, item.id)
                      }
                      value={item.id}
                    >
                      {item.fullName}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  الغاء
                </Button>
                <Button
                  color="primary"
                  type="button"
                  onClick={() => {
                    fetchParent();
                    Swal.fire({
                      icon: "success",
                      title: "تم الاضافة بنجاح",
                      showConfirmButton: false,

                      timer: 1500,
                    });
                    // Handle adding the student to the parent here
                    onClose();
                  }}
                >
                  اضافة
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
        <div>
          <h1 className="text-2xl font-bold my-5">اسماء الابناء المسجلين</h1>

          {parent?.students?.length === 0 && (
            <div className="flex justify-center items-center gap-4">
              <div className="text-center text-gray-800 text-2xl font-semibold font-['Cairo'] leading-9">
                لا يوجد ابناء مسجلين
              </div>
              <div onClick={onOpen}>
                <CgAdd
                  className="text-green-500 text-2xl cursor-pointer"
                  onClick={onOpen}
                />
              </div>
            </div>
          )}
          {parent?.students?.map((student) => (
            <div
              key={student.id}
              className="w-fit flex justify-end my-3 gap-4 items-center"
            >
              <div className="w-fit cursor-pointer hover:border-none hover:bg-slate-300 h-16 px-8 py-4 rounded-2xl border border-black justify-center items-center gap-2 inline-flex">
                <div className="text-right text-gray-800 text-2xl font-semibold font-['Cairo'] leading-9">
                  {student.fullName}
                </div>
              </div>
              <div onClick={() => handleDeleteStudent(student.id)}>
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
            </div>
          ))}
          <Button
            variant="bordered"
            onClick={onOpen}
            color="primary"
            className="flex  justify-center items-center gap-4"
          >
            <div className="text-center text-gray-800 text-2xl font-semibold font-['Cairo'] leading-9">
              اضافة ابناء
            </div>
            <div>
              <CgAdd className="text-blue-500 text-2xl cursor-pointer" />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ParentInfo;
