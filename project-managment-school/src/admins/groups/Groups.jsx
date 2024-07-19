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
  Input,
  DatePicker,
  Autocomplete,
  AutocompleteItem,
  RadioGroup,
  cn,
  Radio,
} from "@nextui-org/react";
import * as Yup from "yup";

import { useLocation, useNavigate } from "react-router-dom";
import { getGroups } from "../../apiCalls/GroupsCals";
import { useFormik } from "formik";
import { format, parseISO } from "date-fns";

function Groups() {
  const nav = useNavigate();
  const [list, setList] = useState([]);
  const pathname = useLocation().pathname;
  const initialValues = {
    groupName: "",
    startDate: "",
    endDate: "",
    studentCount: "",
    teacher: "",
    paymentMethod: "",
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
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Convert date strings to actual Date objects or desired format
      console.log(values);
      handelAdd();
    },
  });
  const data = [
    { label: "محمد العربي", value: 1 },
    { label: "علي العربي", value: 2 },
    { label: "محمود العربي", value: 3 },
    { label: "حسن العربي", value: 4 },
  ];
  const fetchGroups = async () => {
    const newList = await getGroups();
    setList(() => newList);
    console.log(newList);
  };

  useEffect(() => {
    fetchGroups();
    console.log(pathname);
  }, []);

  const [addGroup, setAddGroup] = useState(false);

  const handelAdd = () => {
    setAddGroup(false);
  };
  const handelCancel = () => {
    setAddGroup(false);
  };
  const handelclickGroup = () => {
    nav("group");
  };

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
          >
            <SelectItem>الافواج المكتملة</SelectItem>
            <SelectItem>الغير الغير مكتملة</SelectItem>
          </Select>
        </div>
      </div>
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
              onClick={handelclickGroup}
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
                <TableCell className="text-right">
                  {columnKey === "teachers"
                    ? item.Teachers.length > 0 && item.Teachers
                      ? item.Teachers.map((teacher) => teacher.fullName).join(
                          ", "
                        )
                      : "Not Found"
                    : getKeyValue(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div style={addGroup ? { filter: "blur(2px)" } : {}} className="w-full">
        <div
          onClick={() => setAddGroup(!addGroup)}
          className="w-fit cursor-pointer my-5  mx-auto  px-8 py-2 bg-indigo-500 rounded-2xl justify-center items-center gap-2 "
        >
          <div className="text-center text-white text-2xl font-semibold font-['Cairo'] leading-9">
            اضافة فوج
          </div>
        </div>
      </div>
      {addGroup && (
        <div className="md:w-96 max-md:w-full h-fit md:px-12 z-50 md:py-2 md:top-[5%] md:left-[30%] top-0 left-0 absolute bg-gray-200 rounded-3xl justify-start items-center inline-flex">
          <form
            onSubmit={formik.handleSubmit}
            className="max-md:w-full p-4 self-stretch flex-col justify-start items-end gap-4 inline-flex"
          >
            <div className="self-stretch text-center text-gray-800 text-3xl font-semibold font-['Cairo'] leading-10">
              إضافة فوج
            </div>
            <div className="flex w-full flex-col flex-wrap md:flex-nowrap gap-4">
              <Input
                type="text"
                label="اسم الفوج"
                name="groupName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.groupName}
                error={
                  formik.touched.groupName && formik.errors.groupName
                    ? formik.errors.groupName
                    : null
                }
              />
              <DatePicker
                label="تاريخ البدأ"
                name="startDate"
                error={
                  formik.touched.startDate && formik.errors.startDate
                    ? formik.errors.startDate
                    : null
                }
                variant="flat"
              />
              <DatePicker
                label="تاريخ الانتهاء"
                name="endDate"
                error={
                  formik.touched.endDate && formik.errors.endDate
                    ? formik.errors.endDate
                    : null
                }
                variant="flat"
              />
              <Input
                type="text"
                label="عدد التلاميذ في الفوج"
                name="studentCount"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.studentCount}
                error={
                  formik.touched.studentCount && formik.errors.studentCount
                    ? formik.errors.studentCount
                    : null
                }
              />
              <Autocomplete
                size="sm"
                label="ابحث عن استاذ"
                defaultItems={data}
                className="max-w-xs"
                onSelect={(item) => formik.setFieldValue("teacher", item.value)}
                error={
                  formik.touched.teacher && formik.errors.teacher
                    ? formik.errors.teacher
                    : null
                }
              >
                {(item) => (
                  <AutocompleteItem key={item.value}>
                    {item.label}
                  </AutocompleteItem>
                )}
              </Autocomplete>
              <RadioGroup
                classNames={{ base: cn("flex w-full gap-4") }}
                label="اختر طريقة الدفع"
                name="paymentMethod"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.paymentMethod}
                error={
                  formik.touched.paymentMethod && formik.errors.paymentMethod
                    ? formik.errors.paymentMethod
                    : null
                }
              >
                <div className="flex gap-2">
                  <Radio
                    value="1"
                    classNames={{
                      base: cn(
                        "m-0 bg-content1 w-fit hover:bg-content2 items-center justify-between flex-row-reverse max-w-[300px] cursor-pointer rounded-lg p-2 gap-2 border-2 border-transparent data-[selected=true]:border-primary"
                      ),
                    }}
                  >
                    دفع بالحصة
                  </Radio>
                  <Radio
                    value="2"
                    classNames={{
                      base: cn(
                        "m-0 bg-content1 w-fit hover:bg-content2 items-center justify-between flex-row-reverse max-w-[300px] cursor-pointer rounded-lg p-2 gap-2 border-2 border-transparent data-[selected=true]:border-primary"
                      ),
                    }}
                  >
                    دفع بالشهر
                  </Radio>
                </div>
              </RadioGroup>
            </div>
            <div className="flex w-full gap-2 justify-between items-center">
              <button
                type="submit"
                className="w-full text-center cursor-pointer px-8 py-2 bg-indigo-500 rounded-2xl justify-center items-center gap-2"
              >
                <div className="text-center text-white text-base font-semibold font-['Cairo'] leading-normal">
                  اضافة
                </div>
              </button>
              <div
                onClick={handelCancel}
                className="cursor-pointer w-full px-8 py-2 bg-red-600 rounded-2xl justify-center items-center gap-2"
              >
                <div className="text-center text-white text-base font-semibold font-['Cairo'] leading-normal">
                  الغاء
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Groups;
