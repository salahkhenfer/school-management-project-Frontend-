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
  Pagination,
} from "@nextui-org/react";
import * as Yup from "yup";

import { Form, useLocation, useNavigate } from "react-router-dom";
import { addGroupApi, getGroups } from "../../apiCalls/GroupsCals";
import { ErrorMessage, Field, Formik } from "formik";
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
import {
  addStudent,
  deleteStudent,
  getAllStudent,
  searchStudentApi,
} from "../../apiCalls/studentCalls";
import { MdDelete } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { getAllLanguages } from "../../apiCalls/languagesCalls";
import Education from "../../utils/Education";
import { getCourses } from "../../apiCalls/coursesCalls";
import "jspdf-autotable";
import { font } from "../../assets/Cairo-VariableFont_slnt,wght-normal";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useSelector } from "react-redux";
import { selectAuth } from "../../Redux/slices/authSlice";
import { getParentById, getParentWithUser } from "../../apiCalls/parentCalls";

pdfMake.vfs = {
  ...pdfFonts.pdfMake.vfs,
  "Cairo-Regular.ttf": font,
};

pdfMake.fonts = {
  Cairo: {
    normal: "Cairo-Regular.ttf",
    bold: "Cairo-Regular.ttf",
  },
};

function StudentsGroups() {
  const nav = useNavigate();

  const [loadingGroups, setLoadingGroups] = useState(true);

  const [student, setStudent] = useState([]);
  const { user } = useSelector(selectAuth);

  const fetchStudents = async () => {
    setLoadingGroups(true);
    const res = await getParentWithUser(user);
    setStudent(res.students);
    console.log(res.students);

    setLoadingGroups(false);
  };
  function formatDate(date) {
    if (!date || !date.year || !date.month || !date.day) return "";
    const year = date.year;
    const month = date.month.toString().padStart(2, "0"); // Ensure two-digit format
    const day = date.day.toString().padStart(2, "0"); // Ensure two-digit format
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    fetchStudents();
  }, [user]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold my-5">التلاميذ</h1>
        <Button
          auto
          size="small"
          color="danger"
          icon={<IoIosAddCircle />}
          onClick={() => {
            nav("/parents/sendReport");
          }}
        >
          الابلاغ عن مشكلة
        </Button>
      </div>
      {loadingGroups ? (
        <div className="flex justify-center items-center w-full h-full">
          <Spinner />
        </div>
      ) : (
        <div>
          {Array.isArray(student) && student.length === 0 ? (
            <div className="flex min-h-[60vh] justify-center items-center w-full h-full">
              <div className="text-center text-lg text-gray-500">
                لا يوجد تلاميذ
              </div>
            </div>
          ) : (
            <Table className="min-h-[60vh]" isHeaderSticky>
              <TableHeader>
                <TableColumn key="id">رمز التلميذ</TableColumn>
                <TableColumn key="fullName">اسم التلميذ</TableColumn>
                <TableColumn key="birthDay">تاريخ الميلاد</TableColumn>
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
                        {columnKey === "group"
                          ? item.groupId
                            ? item.groupId
                            : "غير معروف"
                          : columnKey === "birthDay"
                          ? item[columnKey].split("T")[0]
                          : getKeyValue(item, columnKey)}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      )}
    </div>
  );
}

export default StudentsGroups;
