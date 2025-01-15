import React, { useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import { getStudentById, updateStudent } from "../../../apiCalls/studentCalls";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  useDisclosure,
  DatePicker,
} from "@nextui-org/react";
import { CgAdd } from "react-icons/cg";
import { isValid, parseISO } from "date-fns";

import {
  addParent,
  addStudentInToParent,
  deleteStudentForParent,
} from "../../../apiCalls/parentCalls";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { FiDelete } from "react-icons/fi";
import { MdDelete, MdEdit } from "react-icons/md";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";

function StudentsInfo() {
  const [student, setStudent] = useState({});
  const { studentParams } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure(); // use onClose instead of onOpenChange
  const [parent, setParent] = useState({});
  const [isParent, setIsParent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validationSchema = Yup.object({
    fullName: Yup.string().trim().required("اسم التلميذ مطلوب"),
    birthDay: Yup.date().required("تاريخ الميلاد مطلوب"),
  });

  const initialValues = {
    fullName: "",
    birthDay: "",
  };
  const fetchStudent = async () => {
    const response = await getStudentById(studentParams);
    setStudent(response);
  };
  const parseDateString = (dateString) => {
    return new Date(dateString); // ISO string directly converted to Date object
  };

  useEffect(() => {
    fetchStudent();
    // parseDateString(student.birthDay);
    console.log(parseDateString(student.birthDay));
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
      await addParentApi(parentData);
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
    const response = await deleteStudentForParent({
      studentId: student.id,
      parentId: student.parent.id,
    });
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

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: "",
    birthDay: new Date(student.birthDay), // Assuming `student.birthDay` is a valid date string
  });

  // Close the modal
  const onEditClose = () => {
    setIsEditModalOpen(false);
  };

  // Handle form submission
  const handleEditSubmit = async (values) => {
    console.log(values);

    // Handle the form submission (e.g., update the state or make an API call)

    console.log("Form submitted:", {
      fullName: values.fullName,
      birthDay: values.birthDay,
    });
    const response = await updateStudent({
      id: student.id,
      fullName: values.fullName,
      birthDay: values.birthDay,
    });
    if (response) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "تم التعديل بنجاح",

        timer: 1500,
        confirmButtonText: "Okay",
      }).then(() => {
        fetchStudent();

        // Refresh the list of students
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "حدث خطأ",
        text: " لم يتم  التعديل ",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    setIsEditModalOpen(false); // Close modal after submission
  };

  // Handle input changes
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
            <h1 className="text-2xl font-bold my-5">معلومات التلميذ</h1>
            <Button
              isIconOnly
              color="primary"
              variant="light"
              onClick={() => {
                setEditForm({
                  fullName: student.fullName,
                  birthDay: new Date(student.birthDay),
                });
                setIsEditModalOpen(true);
              }}
              className="mt-5"
            >
              <MdEdit className="text-xl" />
            </Button>
          </div>
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
            <div className="text-right flex justify-between gap-5 items-center text-[#242c31] text-base font-semibold font-['Cairo'] leading-normal">
              {student.parent ? (
                <div>{student.parent.fullName}</div>
              ) : (
                "لا يوجد ولي أمر"
              )}
              {student.parent && (
                <div onClick={handleDeleteParent}>
                  <MdDelete className="text-red-500 text-2xl cursor-pointer bg-red-100 p-1 rounded-full w-7 h-7" />
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
          {/* Edit Student Modal */}
          <Modal isOpen={isEditModalOpen} onClose={onEditClose}>
            <ModalContent>
              <ModalHeader className="flex flex-col gap-1">
                تعديل التلميذ
              </ModalHeader>
              <ModalBody>
                <Formik
                  initialValues={editForm}
                  onSubmit={handleEditSubmit}
                  validationSchema={validationSchema}
                >
                  {({ handleSubmit, setFieldValue }) => (
                    <form onSubmit={handleSubmit} id="editForm">
                      <Input
                        className="my-2"
                        type="text"
                        name="fullName"
                        placeholder="اسم التلميذ"
                        value={editForm.fullName}
                        onChange={handleInputChange}
                        required
                      />
                      <div className="w-fit">
                        <Field name="birthDay">
                          {({ field, form }) => (
                            <input
                              type="date"
                              label="تاريخ الميلاد"
                              aria-label="تاريخ الميلاد"
                              value={
                                field.value
                                  ? new Date(field.value)
                                      .toISOString()
                                      .split("T")[0] // Format as yyyy-MM-dd
                                  : ""
                              }
                              onChange={(e) => {
                                const selectedDate = e.target.value;
                                if (selectedDate) {
                                  const formattedDate = new Date(
                                    selectedDate
                                  ).toISOString(); // Format as ISO string
                                  form.setFieldValue(field.name, formattedDate); // Update Formik state
                                }
                              }}
                            />
                          )}
                        </Field>

                        <ErrorMessage
                          name="birthDay"
                          component="div"
                          className="text-red-500"
                        />
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
          {/* Add Parent Modal */}
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
                      <div className="w-fit">
                        <Field name="birthDay">
                          {({ field }) => (
                            <DatePicker
                              label="تاريخ الميلاد"
                              aria-label=" تاريخ الميلاد"
                              selected={field.value}
                              onChange={(date) =>
                                field.onChange({
                                  target: {
                                    name: field.name,
                                    value: date,
                                  },
                                })
                              }
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          name="birthDay"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
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
                      type="button"
                      onClick={() => setIsParent(!isParent)}
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
