import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Select,
  SelectItem,
  cn,
  Button,
  Spinner,
  Modal,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import * as Yup from "yup";

import { Form, useLocation, useNavigate } from "react-router-dom";
import { addGroupApi, getGroups } from "../../apiCalls/GroupsCals";
import { ErrorMessage, Field, Formik, useFormik } from "formik";
import {
  Input,
  DatePicker,
  Autocomplete,
  AutocompleteItem,
  RadioGroup,
  Radio,
} from "@nextui-org/react"; // Adjust imports based on your setup
import Swal from "sweetalert2";
import { IoIosAddCircle } from "react-icons/io";
import { getAllTeachers } from "../../apiCalls/teacherCalls";

function Groups() {
  const nav = useNavigate();
  const [list, setList] = useState([]);
  const pathname = useLocation().pathname;
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [data, setData] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const transformValues = (values) => {
    const paymentMethod =
      values.paymentMethod == "1" ? "session" : "percentage";
    const type =
      values.paymentPerSession.trim() === ""
        ? values.paymentPercentage
        : values.paymentPerSession;
    console.log(type);
    return {
      ...values,
      startDate: formatDate(values.startDate),
      endDate: formatDate(values.endDate),
      theRest: pathname,
      type: type,
      paymentMethod: paymentMethod,
    };
  };
  function formatDate(date) {
    if (!date || !date.year || !date.month || !date.day) return "";
    const year = date.year;
    const month = date.month.toString().padStart(2, "0"); // Ensure two-digit format
    const day = date.day.toString().padStart(2, "0"); // Ensure two-digit format
    return `${year}-${month}-${day}`;
  }

  const fetchAllTeachers = async () => {
    try {
      const response = await getAllTeachers();
      console.log(response);

      if (response) {
        console.log(response);
        setData(() =>
          response.map((teacher) => ({
            id: teacher.id,
            label: teacher.fullName,
          }))
        );
      } else {
        console.log("Failed to fetch teachers");
      }
    } catch (err) {
      console.error("Failed to fetch teachers:", err);
    }
  };

  const fetchGroups = async (pathname) => {
    setLoadingGroups(true);
    const newList = await getGroups(pathname);
    setList(() => newList);
    console.log(newList);
    setLoadingGroups(false);
  };

  useEffect(() => {
    fetchGroups(pathname);
    fetchAllTeachers();
  }, []);

  const [addGroup, setAddGroup] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handlePaymentMethodChange = (event) => {
    console.log(event.target.value);
    setSelectedPaymentMethod(event.target.value);
  };
  const handelAdd = () => {
    setAddGroup(false);
  };
  const handelCancel = () => {
    setAddGroup(false);
  };
  const handleClickGroup = (item) => {
    nav("" + item.id);
  };
  const initialValues = {
    groupName: "",
    startDate: "",
    endDate: "",
    studentCount: "",
    teacher: "",
    paymentMethod: "",
    paymentPerSession: "",
    paymentPercentage: "",
    price: "",
    numberOfSessions: "",
  };
  const validationSchema = Yup.object({
    groupName: Yup.string().required("اسم الفوج مطلوب"),
    startDate: Yup.date().required("تاريخ البدأ مطلوب"),
    endDate: Yup.date().required("تاريخ الانتهاء مطلوب"),
    studentCount: Yup.number()
      .required("عدد التلاميذ في الفوج مطلوب")
      .positive("يجب أن يكون رقماً إيجابياً"),
    teacher: Yup.string().required("ابحث عن استاذ مطلوب"),
    paymentMethod: Yup.string().required("اختر طريقة الدفع مطلوب"),
    paymentPerSession: Yup.number().when("paymentMethod", {
      is: "perSession",
      then: Yup.number()
        .required("سعر الحصة مطلوب")
        .positive("يجب أن يكون رقماً إيجابياً"),
    }),
    paymentPercentage: Yup.number().when("paymentMethod", {
      is: "percentage",
      then: Yup.number()
        .required("نسبة الدفع مطلوب")
        .min(0, "Minimum value is 0")
        .max(100, "Maximum value is 100"),
    }),
    price: Yup.number(),
    numberOfSessions: Yup.number().required("عدد الحصص مطلوب"),
  });

  return (
    <div className="p-5 relative ">
      <div
        style={addGroup ? { filter: "blur(2px)" } : {}}
        className="flex max-md:flex-col  my-10 gap-5 justify-between w-full items-center"
      >
        <div
          className="
      font-bold
      text-3xl
      text-right
      "
        >
          الافواج
        </div>

        <div className="flex  w-full flex-wrap justify-end items-end md:flex-nowrap  md:mb-0 gap-4">
          <Select
            defaultSelectedKeys={["الافواج المكتملة"]}
            placeholder="الافواج المكتملة"
            className="max-w-xs"
            selectedKeys={["الافواج المكتملة"]}
          >
            <SelectItem>الافواج المكتملة</SelectItem>
            <SelectItem>الغير الغير مكتملة</SelectItem>
          </Select>
        </div>
      </div>
      <div style={addGroup ? { filter: "blur(2px)" } : {}} className="w-full">
        <Button
          onPress={onOpen}
          className="w-fit h-fit cursor-pointer mb-5  mx-auto   bg-indigo-500 rounded-2xl justify-center items-center gap-2 "
        >
          <div className="text-center text-white text-2xl px-8 py-2 font-semibold font-['Cairo'] leading-9">
            اضافة فوج
          </div>
          <IoIosAddCircle color="white" className="w-6 h-6" />
        </Button>
      </div>
      {loadingGroups ? (
        <div className="flex justify-center items-center w-full h-full">
          <Spinner />
        </div>
      ) : (
        <Table style={addGroup ? { filter: "blur(2px)" } : {}} isHeaderSticky>
          <TableHeader>
            <TableColumn key="name">الفوج</TableColumn>
            <TableColumn key="Teachers"> اسم الاستاذ</TableColumn>
            <TableColumn key="maxStudents">عدد التلاميذ</TableColumn>
            <TableColumn key="numberOfSessions">عدد الحصص</TableColumn>
          </TableHeader>
          <TableBody items={list}>
            {(item) => (
              <TableRow
                key={item.name}
                onClick={() => handleClickGroup(item)}
                className=" hover:bg-gray-100
            border-b-2
            border-gray-200
            transition-all
            duration-200
            ease-in-out
            h-4
            cursor-pointer
            
            "
              >
                {(columnKey) => (
                  <TableCell key={columnKey + item} className="text-right">
                    {columnKey === "Teachers"
                      ? item.Teachers && item.Teachers.length > 0
                        ? item.Teachers[0].name // Access the fullName property directly
                        : "لم يحد بعد"
                      : getKeyValue(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
      >
        <ModalContent className="w-full">
          {(onClose) => (
            <div className="w-full max-md:w-full h-fit md:px-12  md:py-2    bg-gray-200 rounded-3xl flex flex-col p-4">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { resetForm }) => {
                  // Handle form submission
                  const transformedValues = transformValues(values);
                  console.log(transformedValues);
                  const response = await addGroupApi(transformedValues);
                  if (response) {
                    fetchGroups(pathname);
                    Swal.fire({
                      icon: "success",
                      title: "تمت العملية بنجاح",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  } else {
                    console.log("Failed to add group  " + response);
                    Swal.fire({
                      icon: "error",
                      title: "حدث خطأ ما",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }

                  // Reset form after submission if needed
                  resetForm();
                  onClose();
                  setAddGroup(false);
                }}
              >
                {({
                  handleChange,
                  handleBlur,
                  values,
                  setFieldValue,
                  handleSubmit,
                }) => (
                  <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="text-center text-gray-800 text-3xl font-semibold leading-10">
                      إضافة فوج
                    </div>

                    <Field
                      className="w-full"
                      name="groupName"
                      type="text"
                      as={Input}
                      label="اسم الفوج"
                      aria-label=" اسم الفوج"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.groupName}
                    />
                    <ErrorMessage
                      name="groupName"
                      component="div"
                      className="text-red-500"
                    />
                    <div className="flex gap-4 justify-between items-center w-full">
                      <div className="w-fit">
                        <Field name="startDate">
                          {({ field }) => (
                            <DatePicker
                              label="تاريخ البدأ"
                              aria-label="تاريخ البدأ"
                              selected={field.value}
                              onChange={(date) =>
                                setFieldValue("startDate", date)
                              }
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          name="startDate"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="w-full">
                        <Field name="endDate">
                          {({ field }) => (
                            <DatePicker
                              label="تاريخ الانتهاء"
                              aria-label="تاريخ الانتهاء"
                              selected={field.value}
                              onChange={(date) =>
                                setFieldValue("endDate", date)
                              }
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          name="endDate"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    </div>

                    <div className="flex w-full  gap-4 justify-between items-center w-full">
                      <div className="w-full">
                        <Field
                          name="studentCount"
                          as={Input}
                          type="number"
                          label="عدد التلاميذ في الفوج"
                          aria-label="عدد التلاميذ في الفوج"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.studentCount}
                        />
                        <ErrorMessage
                          name="studentCount"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="w-full">
                        <Field
                          name="numberOfSessions"
                          as={Input}
                          type="number"
                          label="   عدد الحصص"
                          aria-label="عدد الحصص"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.numberOfSessions}
                        />
                        <ErrorMessage
                          name="numberOfSessions"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 justify-between items-center w-full">
                      <Field
                        className="w-full"
                        name="price"
                        as={Input}
                        type="Price"
                        label=" السعر  التلميذ"
                        aria-label=" السعر الاجمالي للحصة"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.price}
                        endContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                              DZD
                            </span>
                          </div>
                        }
                      />
                      <ErrorMessage
                        name="price"
                        component="div"
                        className="text-red-500"
                      />

                      <Field name="teacher">
                        {({ field }) => (
                          <Autocomplete
                            size="sm"
                            label="ابحث عن استاذ"
                            aria-label="ابحث عن استاذ"
                            defaultItems={data}
                            className="max-w-xs"
                            onChange={(id) => setFieldValue("teacher", id)}
                            value={values.teacher}
                          >
                            {(item) => (
                              <AutocompleteItem
                                key={item.id}
                                onClick={() =>
                                  setFieldValue("teacher", item.id)
                                }
                                value={item.id}
                              >
                                {item.label}
                              </AutocompleteItem>
                            )}
                          </Autocomplete>
                        )}
                      </Field>
                      <ErrorMessage
                        name="teacher"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div className="flex gap-4 justify-between items-center w-full">
                      <RadioGroup
                        className="flex w-full gap-4"
                        label="اختر طريقة الدفع"
                        as={RadioGroup}
                        name="paymentMethod"
                        value={values.paymentMethod}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                      >
                        <div className="flex gap-2">
                          <Field
                            type="radio"
                            name="paymentMethod"
                            value="1"
                            as={Radio}
                            onChange={(e) => {
                              handleChange(e);
                              handlePaymentMethodChange(e);
                            }}
                            className="cursor-pointer rounded-lg p-2 border-2 border-transparent"
                          >
                            دفع بالحصة
                          </Field>
                          <Field
                            type="radio"
                            name="paymentMethod"
                            value="2"
                            onChange={(e) => {
                              handleChange(e);
                              handlePaymentMethodChange(e);
                            }}
                            as={Radio}
                            className="cursor-pointer rounded-lg p-2 border-2 border-transparent"
                          >
                            دفع بالنسبة
                          </Field>
                        </div>
                      </RadioGroup>
                      <ErrorMessage
                        name="paymentMethod"
                        component="div"
                        className="text-red-500"
                      />

                      {selectedPaymentMethod === "1" && (
                        <Field
                          className="w-full"
                          name="paymentPerSession"
                          as={Input}
                          type="Price"
                          label="سعر الحصة"
                          aria-label="سعر الحصة"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.paymentPerSession}
                          endContent={
                            <div className="pointer-events-none flex items-center">
                              <span className="text-default-400 text-small">
                                DZD
                              </span>
                            </div>
                          }
                        />
                      )}
                      {selectedPaymentMethod === "2" && (
                        <Field
                          className="w-full"
                          name="paymentPercentage"
                          as={Input}
                          type="number"
                          label="نسبة الدفع"
                          aria-label="نسبة الدفع"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.paymentPercentage}
                          min={0}
                          max={100}
                          endContent={
                            <div className="pointer-events-none flex items-center">
                              <span className="text-default-600 text-xl font-bold">
                                %
                              </span>
                            </div>
                          }
                        />
                      )}
                    </div>

                    <div className="flex w-full gap-2 justify-between items-center">
                      <Button
                        type="submit"
                        className="w-full text-center text-white text-base font-semibold bg-indigo-500 rounded-2xl px-8 py-2"
                      >
                        اضافة
                      </Button>
                      <Button
                        type="button"
                        onClick={handelCancel}
                        onPress={onClose}
                        className="w-full text-center text-white text-base font-semibold bg-red-600 rounded-2xl px-8 py-2"
                      >
                        الغاء
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          )}
        </ModalContent>
      </Modal>{" "}
    </div>
  );
}

export default Groups;
