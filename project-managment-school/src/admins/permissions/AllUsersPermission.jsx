import {
  CheckboxIcon,
  Chip,
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { format, formatDate } from "date-fns";
import { BiCheck } from "react-icons/bi";
import { getUsersByRole } from "../../apiCalls/permissionsCalls";

function AllUsersPermission() {
  const [paymentTeacher, setPaymentTeacher] = useState([]);

  const getTeacherPayment = async () => {
    const paymentTeacherApi = await getUsersByRole("sub-admin");
    setPaymentTeacher(paymentTeacherApi.reverse());
    console.log(paymentTeacher);
  };

  useEffect(() => {
    getTeacherPayment();
  }, []);

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          fontSize: "30px",
          color: "rgb(0, 0, 0)",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        {" "}
        جميع حسابات المسؤولين{" "}
      </h1>

      <div>
        <Table className="min-h-[60vh]" isHeaderSticky>
          <TableHeader>
            <TableColumn key="id">رمز الدفع</TableColumn>
            <TableColumn key="username"> اسم المستخدم </TableColumn>
            <TableColumn key="password"> كلمة السر </TableColumn>
            <TableColumn key="createdAt">التاريخ </TableColumn>
          </TableHeader>
          <TableBody items={paymentTeacher}>
            {(item) => (
              <TableRow
                className="hover:bg-gray-100 border-b-2 border-gray-200 transition-all duration-200 ease-in-out cursor-pointer"
                key={item.id}
              >
                {(columnKey) => (
                  <TableCell className="text-right">
                    {columnKey === "createdAt"
                      ? formatDate(item[columnKey], " yyyy-MM-dd ")
                      : getKeyValue(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default AllUsersPermission;
