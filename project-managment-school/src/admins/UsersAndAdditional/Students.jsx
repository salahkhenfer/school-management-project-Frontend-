import {
  Button,
  Modal,
  ModalContent,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

import {
  Autocomplete,
  AutocompleteItem,
  DatePicker,
  Input,
  Radio,
  RadioGroup,
} from "@nextui-org/react"; // Adjust imports based on your setup
import { ErrorMessage, Field, Formik } from "formik";
import "jspdf-autotable";

import { FaSearch } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { Form, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getCourses } from "../../apiCalls/coursesCalls";
import { getGroups } from "../../apiCalls/GroupsCals";
import { getAllLanguages } from "../../apiCalls/languagesCalls";
import {
  addStudent,
  deleteStudent,
  getAllStudent,
  searchStudentApi,
} from "../../apiCalls/studentCalls";
import Education from "../../utils/Education";
import pdfMake from "pdfmake/build/pdfmake";
import { font } from "../../assets/Cairo-VariableFont_slnt,wght-normal";
import { format, formatDate } from "date-fns/format";

function Students() {
  const nav = useNavigate();
  const [list, setList] = useState([]);
  const pathname = useLocation().pathname;
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [data, setData] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [student, setStudent] = useState([]);
  const [searchStudent, setSearchStudent] = useState("");
  const [languages, setLanguages] = useState([]);
  const [courses, setCourses] = useState([]);
  const [atwar, setAtwar] = useState([]);
  const [group, setGroup] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("");
  const theLevelsData = Education;
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selcetYear, setSelcetYear] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const level = [
    {
      id: 1,
      name: "pre A1",
    },
    {
      id: 2,
      name: "A1",
    },
    {
      id: 3,
      name: "A2",
    },
    {
      id: 4,
      name: "B1",
    },
    {
      id: 5,
      name: "B2",
    },
    {
      id: 6,
      name: "C1",
    },
    {
      id: 7,
      name: "C2",
    },
  ];
  const fetchStudents = async () => {
    setLoadingGroups(true);
    const newList = await getAllStudent();
    console.log(newList);
    setStudent(newList.students);
    console.log(newList);
    setLoadingGroups(false);
  };
  // function formatDate(date) {
  //   if (!date || !date.year || !date.month || !date.day) return "";
  //   const year = date.year;
  //   const month = date.month.toString().padStart(2, "0"); // Ensure two-digit format
  //   const day = date.day.toString().padStart(2, "0"); // Ensure two-digit format
  //   return `${year}-${month}-${day}`;
  // }
  pdfMake.vfs = {
    ...pdfMake.vfs,
    "Cairo-Regular.ttf": font,
  };

  pdfMake.fonts = {
    Cairo: {
      normal: "Cairo-Regular.ttf",
      bold: "Cairo-Regular.ttf",
    },
  };
  const fetchLanguages = async () => {
    const newList = await getAllLanguages();
    setLanguages(newList);
    console.log(newList);
  };

  const fetchCourses = async () => {
    const newList = await getCourses();
    setCourses(newList);
    console.log(newList);
  };

  useEffect(() => {
    fetchStudents();
    fetchLanguages();
    fetchCourses();
  }, []);

  const initialValues = {
    studentName: "",
    birthDay: new Date(),
    ClassChoose: "",
    levels: "",
    group: {},
    theYear: "",
    theModule: "",
  };
  const validationSchema = Yup.object().shape({
    studentName: Yup.string().required("اسم التلميذ مطلوب"),
    birthDay: Yup.date().required("تاريخ الميلاد مطلوب"),
    ClassChoose: Yup.string().required("اختر نوع الفصل"),
    group: Yup.object().shape({
      id: Yup.number().required("اختر الفوج"),
      price: Yup.number().required("السعر مطلوب"),
    }),
  });
  const deleteStudentApi = async (index, id) => {
    try {
      // Confirm deletion with the user using a more compact configuration
      const { isConfirmed } = await Swal.fire({
        title: "هل أنت متأكد؟",
        text: "هل تريد حقًا حذف هذا التلميذ؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "نعم",
        cancelButtonText: "إلغاء",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          try {
            await deleteStudent(id);
            setStudent((prev) => prev.filter((_, i) => i !== index));

            fetchStudents();
          } catch (error) {
            Swal.showValidationMessage(`حدث خطأ: ${error}`);
            return false;
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });

      if (isConfirmed) {
        // Show success toast instead of a full modal
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "تم حذف التلميذ بنجاح",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      console.error("Failed to delete student:", err);
      // Show error toast instead of a full modal
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "حدث خطأ ما",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const fetchStudentsByPage = async (page) => {
    const response = await getAllStudent(page);
    setStudent(response);
  };
  const handleSearch = async () => {
    if (searchStudent === "") {
      return fetchStudents();
    }
    const newList = await searchStudentApi(searchStudent);

    setStudent(newList);
  };
  // Function to convert text to RTL
  const convertTextToRtl = (text) => {
    return text.split(" ").reverse().join("  ");
  };
  // وظيفة إنشاء PDF لوصل الدفع

  const handlePrint = (student) => {
    const groupName = group.filter((item) => item.id === student.groupId);
    if (!student) {
      Swal.fire({
        icon: "error",
        title: "عذرا",
        text: "لا يوجد معلومات لطباعة وصل الدفع",
      });
      return;
    }

    const docDefinition = {
      pageSize: {
        width: 180,
        height: "auto",
      },
      pageMargins: [10, 10, 10, 10],
      content: [
        {
          text: convertTextToRtl("وصل دفع"),
          style: "header",
          margin: [0, 0, 0, 10],
          alignment: "center",
        },
        {
          text: convertTextToRtl(`اسم التلميذ: ${student.fullName}`),
          style: "smallText",
        },
        {
          text: convertTextToRtl(`تاريخ الميلاد: ${student.birthDay}`),
          style: "smallText",
        },
        {
          text: convertTextToRtl(`الصف: ${groupName[0]?.name}`),
          style: "smallText",
        },
        {
          text: convertTextToRtl(`السعر: ${student.price} DZD`),
          style: "smallText",
        },
        {
          text: convertTextToRtl(
            `تاريخ الدفع: ${new Date().toLocaleDateString()}`
          ),
          style: "smallText",
        },
        {
          text: convertTextToRtl("شكرا لتسديدك!"),
          style: "smallText",
          margin: [0, 10, 0, 0],
        },
      ],
      styles: {
        header: {
          fontSize: 14,
          bold: true,
          alignment: "center",
          decoration: "underline", // Underline the header
        },
        smallText: {
          fontSize: 8, // Smaller font size for receipt-like text
          alignment: "right",
          margin: [0, 2], // Add some space between lines
        },
      },
      defaultStyle: {
        font: "Cairo", // Set default font for the entire document
      },
      // Add borders to the page
      layout: {
        hLineColor: function (i, node) {
          return "#000000";
        }, // Line color
        vLineColor: function (i, node) {
          return "#000000";
        }, // Line color
        hLineWidth: function (i, node) {
          return 1;
        }, // Line width
        vLineWidth: function (i, node) {
          return 1;
        }, // Line width
        paddingLeft: function (i, node) {
          return 4;
        },
        paddingRight: function (i, node) {
          return 4;
        },
        paddingTop: function (i, node) {
          return 4;
        },
        paddingBottom: function (i, node) {
          return 4;
        },
      },
    };

    pdfMake.createPdf(docDefinition).open();
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold my-5">التلاميذ</h1>
      </div>
      <div className="w-full max-md:flex-col flex justify-between items-center">
        <div className="w-full py-5 ">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[20rem] ",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/50 dark:bg-default-500/20",
            }}
            placeholder=" ابحث عن تلميذ ..."
            size="lg"
            startContent={<FaSearch size={18} />}
            endContent={
              <FaSearch
                onClick={handleSearch}
                className=" h-fit cursor-pointer  w-fit p-3 text-white bg-sky-600 rounded-full  "
                size={20}
              />
            }
            onChange={(e) => setSearchStudent(e.target.value)}
            type="search"
          />
        </div>
        <Button
          onPress={onOpen}
          className="w-fit h-fit cursor-pointer mb-5  mx-auto   bg-indigo-500 rounded-2xl justify-center items-center gap-2 "
        >
          <div className="text-center text-white text-xl px-8 py-1 font-semibold font-['Cairo'] leading-9">
            اضافة تلميذ
          </div>
          <IoIosAddCircle color="white" className="w-6 h-6" />
        </Button>
      </div>
      {loadingGroups ? (
        <div className="flex justify-center items-center w-full h-full">
          <Spinner />
        </div>
      ) : (
        <div>
          {student?.length === 0 ? (
            <div className="flex min-h-[60vh] justify-center items-center w-full h-full">
              <div className="text-center text-lg text-gray-500">
                لا يوجد تلاميذ
              </div>
            </div>
          ) : (
            <Table className="min-h-[60vh] " isHeaderSticky>
              <TableHeader>
                <TableColumn key="id">رمز التلميذ</TableColumn>
                <TableColumn key="fullName">اسم التلميذ</TableColumn>
                <TableColumn key="birthDay">تاريخ الميلاد</TableColumn>
                <TableColumn key="action">العمليات</TableColumn>
              </TableHeader>
              <TableBody items={student}>
                {(item) => (
                  <TableRow
                    className="
            hover:bg-gray-100
            border-b-2
            border-gray-200
            transition-all
            duration-200
            ease-in-out
            h-4
            cursor-pointer
          "
                    key={item.id}
                    onClick={() => {
                      nav(`${item.id}`);
                      console.log(item.id);
                    }}
                  >
                    {(columnKey) => (
                      <TableCell className="text-right h-7">
                        {columnKey === "group" &&
                          (item.groupId ? item.groupId : "غير معروف")}
                        {columnKey === "action" ? (
                          <div className="flex ">
                            <Button
                              color="danger"
                              startContent={<MdDelete />}
                              onClick={() =>
                                deleteStudentApi(student.indexOf(item), item.id)
                              }
                            >
                              {" "}
                            </Button>
                          </div>
                        ) : columnKey === "birthDay" ? (
                          format(new Date(item[columnKey]), "yyyy-MM-dd")
                        ) : (
                          // getKeyValue(index, columnKey)
                          getKeyValue(item, columnKey)
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
          {/* {student?.totalPages > 5 && (
            <Pagination
              total={student?.totalPages}
              initialPage={1}
              onChange={(page) => {
                // احصل على رقم الصفحة الجديد هنا
                console.log(`Page changed to: ${page}`);
                // نفذ العملية المناسبة باستخدام رقم الصفحة الجديد، مثل تحديث البيانات من الخادم
                fetchStudentsByPage(page);
              }}
            />
          )} */}
          {/* <Pagination
            total={33}
            initialPage={1}
            onChange={(page) => {
              // احصل على رقم الصفحة الجديد هنا
              console.log(`Page changed to: ${page}`);
              // نفذ العملية المناسبة باستخدام رقم الصفحة الجديد، مثل تحديث البيانات من الخادم
              fetchStudentsByPage(page);
            }}
          /> */}
        </div>
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
                  console.log(values);
                  // Handle form submission
                  const formatDate = (dateObj) => {
                    const day = String(dateObj.day).padStart(2, "0");
                    const month = String(dateObj.month).padStart(2, "0");
                    const year = dateObj.year;
                    return `${month}-${day}-${year}`;
                  };
                  const newStudent = {
                    fullName: values.studentName.trim(),
                    birthDay: formatDate(values.birthDay),
                    groupId: values.group.id,
                    price: values.group.price,
                  };

                  console.log(newStudent);

                  const response = await addStudent(newStudent);
                  if (response) {
                    Swal.fire({
                      position: "center",
                      icon: "success",
                      title: "تمت إضافة التلميذ بنجاح",
                      timer: 1500,
                      confirmButtonText: "Okay",
                    }).then(() => {
                      handlePrint(newStudent);

                      resetForm();
                      onClose();
                      fetchStudents(); // Refresh the list of students
                    });
                  } else {
                    Swal.fire({
                      position: "center",
                      icon: "error",
                      title: "حدث خطأ",
                      text: " التلميذ موجود بالفعل في  الفوج",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }

                  // Reset form after submission if needed
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
                      إضافة تلميذ
                    </div>

                    <div className="flex justify-between items-center w-full">
                      <div className="w-fit">
                        <Field
                          className="w-fit"
                          name="studentName"
                          type="text"
                          as={Input}
                          label="الاسم الكامل لتلميذ"
                          aria-label=" الاسم الكامل للتلميذ"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.studentName}
                        />
                        <ErrorMessage
                          name="studentName"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="w-fit">
                        <Field name="birthDay">
                          {({ field }) => (
                            <DatePicker
                              label="تاريخ الميلاد"
                              aria-label=" تاريخ الميلاد"
                              selected={field.value}
                              onChange={(date) =>
                                setFieldValue("birthDay", date)
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
                    </div>

                    <div className="flex w-full  gap-4 justify-between items-center w-full">
                      <RadioGroup
                        className="flex w-full gap-4"
                        label="اختر  "
                        as={RadioGroup}
                        name="ClassChoose"
                        value={values.ClassChoose}
                        onChange={(e) => {
                          handleChange(e);
                          setGroup((prev) => []);
                        }}
                        onBlur={handleBlur}
                      >
                        <div className="flex gap-2">
                          <Field
                            type="radio"
                            name="Languages"
                            value="Languages"
                            as={Radio}
                            onChange={(e) => {
                              handleChange(e);
                              setGroup((prev) => []);
                            }}
                            className="cursor-pointer rounded-lg p-2 border-2 border-transparent"
                          >
                            اللغات
                          </Field>
                          <Field
                            type="radio"
                            name="Courses"
                            value="Courses"
                            onChange={(e) => {
                              handleChange(e);
                              setGroup((prev) => []);
                            }}
                            as={Radio}
                            className="cursor-pointer rounded-lg p-2 border-2 border-transparent"
                          >
                            الدورات
                          </Field>
                          <Field
                            type="radio"
                            name="levels"
                            value="levels"
                            onChange={(e) => {
                              setGroup((prev) => []);
                              handleChange(e);
                            }}
                            as={Radio}
                            className="cursor-pointer rounded-lg p-2 border-2 border-transparent"
                          >
                            المستويات
                          </Field>
                        </div>
                      </RadioGroup>
                      <ErrorMessage
                        name="ClassChoose"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    {/* <div className="flex gap-4 justify-between items-center w-full">
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
                    </div> */}
                    {values.ClassChoose === "Languages" && (
                      <div>
                        <Field className="w-full my-2" name="Language">
                          {({ field }) => (
                            <Autocomplete
                              size="sm"
                              label="ابحث عن لغة"
                              aria-label="ابحث عن لغة"
                              defaultItems={languages}
                              className="w-full "
                              onChange={(language) =>
                                setFieldValue("language", language)
                              }
                              value={values.language}
                            >
                              {(item) => (
                                <AutocompleteItem
                                  key={item.id}
                                  onClick={() =>
                                    setFieldValue("language", item.name)
                                  }
                                  value={item.name}
                                >
                                  {item.name}
                                </AutocompleteItem>
                              )}
                            </Autocomplete>
                          )}
                        </Field>
                        <ErrorMessage
                          name="Language"
                          component="div"
                          className="text-red-500"
                        />
                        <Field className="w-full my-2" name="level">
                          {({ field }) => (
                            <Autocomplete
                              size="sm"
                              label="ابحث عن مستوى"
                              aria-label="ابحث عن مستوى"
                              defaultItems={level}
                              className="w-full my-2"
                              onChange={(level) =>
                                setFieldValue("level", level)
                              }
                            >
                              {(item) => (
                                <AutocompleteItem
                                  key={item.id}
                                  onClick={() =>
                                    setFieldValue("level", item.name)
                                  }
                                >
                                  {item.name}
                                </AutocompleteItem>
                              )}
                            </Autocomplete>
                          )}
                        </Field>
                        <ErrorMessage
                          name="level"
                          component="div"
                          className="text-red-500"
                        />
                        <Button
                          onClick={async () => {
                            setGroup((prev) => []);
                            setLoadingSearch(true);

                            // Construct the URL with encoded components
                            const url = `/classes/Languages/${encodeURIComponent(
                              values.language
                            )}/${encodeURIComponent(values.level)}`;

                            // Fetch data from the API
                            const newList = await getGroups(url);

                            // Filter and update the state with incomplete items
                            newList.forEach((item) => {
                              if (!item.isCompleted) {
                                setGroup((prev) => [...prev, item]);
                              }
                            });

                            setLoadingSearch(false);
                          }}
                          className="w-full text-center text-white text-base font-semibold bg-indigo-500 rounded-2xl px-8 py-2"
                        >
                          ابحث عن فوج
                        </Button>
                      </div>
                    )}
                    {values.ClassChoose === "levels" && (
                      <form>
                        <Field name="level">
                          {({ field }) => (
                            <Select
                              label="اختر مستوى"
                              aria-label="اختر مستوى"
                              size="sm"
                              onChange={(e) => {
                                const level = e.target.value;
                                setFieldValue("level", level);
                                setSelectedLevel(level);
                                console.log(level);
                                setSelectedGroup(""); // Reset group when level changes
                              }}
                              value={values.level}
                            >
                              {Object.keys(theLevelsData).map((level) => (
                                <SelectItem key={level} value={level}>
                                  {level}
                                </SelectItem>
                              ))}
                            </Select>
                          )}
                        </Field>
                        {selectedLevel && (
                          <Field name="theYear">
                            {({ field }) => (
                              <Select
                                label="اختر السنة الدراسية"
                                aria-label="اختر السنة الدراسية"
                                size="sm"
                                onChange={(e) => {
                                  setFieldValue("theYear", e.target.value);
                                  setSelcetYear(e.target.value);
                                }}
                                value={values.theYear}
                              >
                                {Object.keys(theLevelsData[selectedLevel]).map(
                                  (theYear) => (
                                    <SelectItem key={theYear} value={theYear}>
                                      {theYear}
                                    </SelectItem>
                                  )
                                )}
                              </Select>
                            )}
                          </Field>
                        )}
                        {selcetYear && (
                          <Field name="theModule">
                            {({ field }) => (
                              <Select
                                label="اختر المادة"
                                aria-label="اختر  المادة"
                                size="sm"
                                onChange={(e) => {
                                  setFieldValue("theModule", e.target.value);
                                  setSelectedModule(e.target.value);
                                }}
                                value={values.theModule}
                              >
                                {theLevelsData[selectedLevel][selcetYear]?.map(
                                  (theModule) => (
                                    <SelectItem
                                      key={theModule}
                                      value={theModule}
                                    >
                                      {theModule}
                                    </SelectItem>
                                  )
                                )}
                              </Select>
                            )}
                          </Field>
                        )}
                        {selectedModule && (
                          <Button
                            onClick={async () => {
                              setGroup((prev) => []);
                              setLoadingSearch(true);

                              // Construct the URL with encoded components
                              const url = `/classes/Levels/${encodeURIComponent(
                                values.level
                              )}/${encodeURIComponent(
                                values.theYear
                              )}/${encodeURIComponent(values.theModule)}`;

                              // Fetch data from the API
                              const newList = await getGroups(url);
                              console.log(values.theModule);

                              // Filter and update the state with incomplete items
                              newList.forEach((item) => {
                                if (!item.isCompleted) {
                                  setGroup((prev) => [...prev, item]);
                                }
                              });

                              setLoadingSearch(false);
                            }}
                            className="w-full text-center text-white text-base font-semibold bg-indigo-500 rounded-2xl px-8 py-2"
                          >
                            ابحث عن فوج
                          </Button>
                        )}
                      </form>
                    )}
                    {values.ClassChoose === "Courses" && (
                      <div>
                        <Field className="w-full my-2" name="Course">
                          {({ field }) => (
                            <Autocomplete
                              size="sm"
                              label="ابحث عن دورة"
                              aria-label="ابحث عن دورة"
                              defaultItems={courses}
                              className="w-full "
                              onChange={(course) =>
                                setFieldValue("course", course)
                              }
                              value={values.course}
                            >
                              {(item) => (
                                <AutocompleteItem
                                  key={item.id}
                                  onClick={() =>
                                    setFieldValue("course", item.name)
                                  }
                                  value={item.name}
                                >
                                  {item.name}
                                </AutocompleteItem>
                              )}
                            </Autocomplete>
                          )}
                        </Field>
                        <ErrorMessage
                          name="Course"
                          component="div"
                          className="text-red-500"
                        />
                        <Button
                          onClick={async () => {
                            setGroup((prev) => []);
                            setLoadingSearch(true);

                            // Construct the URL with encoded components
                            const url = `/classes/Courses/${encodeURIComponent(
                              values.course
                            )}`;

                            // Fetch data from the API
                            const newList = await getGroups(url);

                            // Filter and update the state with incomplete items
                            newList.forEach((item) => {
                              if (!item.isCompleted) {
                                setGroup((prev) => [...prev, item]);
                              }
                            });

                            setLoadingSearch(false);
                          }}
                          className="w-full text-center text-white text-base font-semibold bg-indigo-500 rounded-2xl px-8 py-2"
                        >
                          ابحث عن فوج
                        </Button>
                      </div>
                    )}
                    {group.length > 0 && (
                      <div className="">
                        <Field name="group">
                          {({ field }) => (
                            <Select
                              label="اختر فوج"
                              aria-label="اختر فوج"
                              size="sm"
                              onChange={(e) => {
                                setFieldValue("group", e.target.value);
                              }}
                              value={values.group}
                            >
                              {group.map((item) => (
                                <SelectItem
                                  onClick={() => setFieldValue("group", item)}
                                  key={item.id}
                                  value={item.id}
                                >
                                  {item.name}
                                </SelectItem>
                              ))}
                            </Select>
                          )}
                        </Field>
                        <div className="flex my-2  gap-4 justify-between items-center w-full">
                          <Field
                            className="w-full"
                            name="price"
                            as={Input}
                            type="Price"
                            label=" السعر  التلميذ"
                            aria-label=" السعر الاجمالي للحصة"
                            onChange={(e) => {
                              setFieldValue("group.price", e.target.value);
                            }} // handleChange
                            onBlur={handleBlur}
                            value={values.group.price}
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
                        </div>
                      </div>
                    )}

                    <ErrorMessage
                      name="group"
                      component="div"
                      className="text-red-500"
                    />
                    {loadingSearch && (
                      <div className="flex justify-center items-center w-full">
                        <Spinner />
                      </div>
                    )}

                    <div className="flex w-full gap-2 justify-between items-center">
                      <Button
                        type="submit"
                        className="w-full text-center text-white text-base font-semibold bg-indigo-500 rounded-2xl px-8 py-2"
                      >
                        اضافة
                      </Button>
                      <Button
                        type="button"
                        onClick={onClose}
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

export default Students;
