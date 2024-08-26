import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";

import "jspdf-autotable";

import { IoIosAddCircle } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAuth } from "../../Redux/slices/authSlice";
import { getParentWithUser } from "../../apiCalls/parentCalls";
import { format } from "date-fns/format";

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
                          ? format(new Date(item[columnKey]), "yyyy-MM-dd")
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
