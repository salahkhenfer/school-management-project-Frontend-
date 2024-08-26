import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getTeacherById,
  getTeacherWithUser,
} from "../../../apiCalls/teacherCalls";
import {
  Button,
  getKeyValue,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { getPaymentByGroup } from "../../../apiCalls/patmentCalls";
import { getGroupById } from "../../../apiCalls/GroupsCals";
import { addPaymentTeacher } from "../../../apiCalls/PaymentsTeacher";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../Redux/slices/authSlice";

function FinancialTeachersInfo() {
  const { FinancialTeachersParams } = useParams();
  const [FinancialTeachers, setFinancialTeachers] = useState({ groups: [] });
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState({});
  const [studentsPayment, setStudentsPayment] = useState([]);
  const [loadingGroups, setLoadingGroups] = useState(false);
  const { user } = useSelector(selectAuth);
  const [teacherInfo, setTeacherInfo] = useState({});
  const [completedGroupsWithPayments, setCompletedGroupsWithPayments] =
    useState([]);

  const nav = useNavigate();

  const fetchFinancialTeachers = async () => {
    try {
      const responseTeacher = await getTeacherWithUser(user);
      setTeacherInfo(responseTeacher);
      console.log("ééééé", responseTeacher);
      setLoadingGroups(true);
      const response = await getTeacherById(
        FinancialTeachersParams || responseTeacher.id
      );
      console.log("esdfsdf : ", response);
      setGroups(response.groups);

      setFinancialTeachers(response);

      // Fetch all group details concurrently
      const groups = await Promise.all(
        response.groups.map(async (group) => await getGroupById(group.id))
      );

      setCompletedGroupsWithPayments(groups);

      setLoadingGroups(false);
    } catch (error) {
      console.error("Error fetching financial teachers and groups:", error);
      setLoadingGroups(false);
    }
  };

  const calculateTotal = (amount, type) => {
    let multiplier;

    multiplier = parseFloat(type) / 100;

    return amount * multiplier;
  };

  const fetchPayments = async (groupId) => {
    setLoadingGroups(true);
    const response = await getPaymentByGroup(groupId);
    const group = await getGroupById(groupId);
    console.log(group);
    setGroup(group);
    const paymentStudents = response.map((student) => {
      return {
        id: student.id,
        student: student.student?.fullName,
        amount: student.amount,
        type: group.type,
        total: calculateTotal(student.amount, group.type),
      };
    });

    setStudentsPayment(paymentStudents);
    console.log(response);

    setLoadingGroups(false);
  };
  const getTotalamount = (studentsPayment) => {
    let total = 0;
    studentsPayment.forEach((student) => {
      total += student.total;
    });
    return total;
  };

  useEffect(() => {
    fetchFinancialTeachers();
  }, []);

  const handlePayment = async (amount) => {
    const response = await addPaymentTeacher(
      parseInt(FinancialTeachersParams || user.id),
      group.id,
      amount
    );
    console.log(response);
    if (response) {
      Swal.fire({
        title: "تم الدفع بنجاح",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });

      fetchPayments(group.id);
    }

    // const response = await addPaymentTeacher(payment);
    // if (response) {
    //   fetchPayments(group.id);
    // }
  };

  const renderTable = () => (
    <div>
      {FinancialTeachersParams ? (
        group?.groupPayments ? (
          <div>
            <Button className="mt-4" disabled auto>
              تم دفع المبلغ والمقدر ب : {group?.groupPayments?.amount} دينار
              جزائري
            </Button>
          </div>
        ) : (
          <div>
            <h1
              style={{
                fontSize: "20px",
                color: "rgb(0, 0, 0)",
                fontWeight: "bold",
              }}
            >
              المبلغ الكلي للفوج : DZD {getTotalamount(studentsPayment)}
            </h1>
            <Button
              onClick={() => {
                handlePayment(getTotalamount(studentsPayment));
              }}
              color="success"
              className="mt-4 text-white"
            >
              دفع المبلغ
            </Button>
          </div>
        )
      ) : null}
      <Table className="min-h-[60vh]" isHeaderSticky>
        <TableHeader>
          <TableColumn key="id">رمز التلميذ</TableColumn>
          <TableColumn key="student">اسم التلميذ</TableColumn>
          <TableColumn key="amount">مبلغ المدفوع (دج)</TableColumn>
          <TableColumn key="type">النسبة</TableColumn>
          <TableColumn key="total">الصافي (دج)</TableColumn>
        </TableHeader>
        <TableBody items={studentsPayment}>
          {(item) => (
            <TableRow
              className="hover:bg-gray-100 border-b-2 border-gray-200 transition-all duration-200 ease-in-out cursor-pointer"
              key={item.id}
            >
              {(columnKey) => (
                <TableCell className="text-right">
                  {getKeyValue(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );

  const renderSessionInfo = () => (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        معلومات الفوج للأستاذ
      </h2>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">عدد الحصص:</span>
          <span className="font-semibold text-gray-800">
            {group.numberOfSessions}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">مبلغ الحصة الواحدة:</span>
          <span className="font-semibold text-gray-800">
            {parseFloat(group.type).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
          <span className="text-gray-600 font-semibold">المجموع:</span>
          <span className="font-bold text-lg text-green-600">
            {(group.numberOfSessions * parseFloat(group.type)).toFixed(2)}
          </span>
        </div>
        {FinancialTeachersParams &&
          (group.groupPayments ? (
            <div>
              <Button className="mt-4" disabled auto>
                تم دفع المبلغ
              </Button>
            </div>
          ) : (
            <div>
              <Button
                onClick={() => {
                  handlePayment(
                    group.numberOfSessions * parseFloat(group.type)
                  );
                }}
                color="success"
                className="mt-4 text-white"
                auto
              >
                دفع المبلغ
              </Button>
            </div>
          ))}
      </div>
    </div>
  );

  const renderContent = () => {
    if (studentsPayment.length === 0) {
      return (
        <div className="flex min-h-[60vh] justify-center items-center w-full h-full">
          <div className="text-center text-lg text-gray-500">
            لا يوجد تلاميذ
          </div>
        </div>
      );
    }

    switch (group.paymentMethod) {
      case "percentage":
        return renderTable();
      case "session":
        return renderSessionInfo();
      default:
        return null;
    }
  };

  const handleTransitionDone = () => {
    nav("TransitionDone");
  };
  const renderGroupSelection = () => {
    console.log(completedGroupsWithPayments);
    const completedGroupsWithPaymentsNew = completedGroupsWithPayments.filter(
      (group) => group.isCompleted && !group.groupPayments
    );
    if (completedGroupsWithPaymentsNew.length == 0) {
      return (
        <Select
          label="الفوج"
          placeholder="اختر الفوج"
          className="max-w-xs"
          disabled
        >
          <SelectItem key="no-groups" value="no-groups">
            لايوجد افواج مكتملة
          </SelectItem>
        </Select>
      );
    }
    return (
      <Select
        label="الفوج"
        placeholder="اختر الفوج"
        selectionMode="single"
        className="max-w-xs"
        onChange={(e) => fetchPayments(e.target.value)}
      >
        {completedGroupsWithPaymentsNew.map((group) => (
          <SelectItem key={group.id} value={group.name}>
            {group.name}
          </SelectItem>
        ))}
      </Select>
    );
  };

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          fontSize: "30px",
          color: "rgb(0, 0, 0)",
          fontWeight: "bold",
        }}
      >
        التسيير المالي للأستاذ
      </h1>
      <h1
        style={{
          fontSize: "20px",
          color: "rgb(0, 0, 0)",
          fontWeight: "bold",
        }}
      >
        الاستاذ: {FinancialTeachers?.fullName}
      </h1>
      <div className="flex justify-between items-center">
        <h1
          style={{
            fontSize: "20px",
            color: "rgb(0, 0, 0)",
            fontWeight: "bold",
          }}
        >
          مبلغ كل فوج
        </h1>
        {renderGroupSelection()}

        <div>
          <Button
            onClick={handleTransitionDone}
            color="success"
            className="text-white"
          >
            رؤية التحويلات النمرسلة للأستاذ
          </Button>
        </div>
      </div>
      {loadingGroups ? (
        <div className="flex justify-center items-center w-full h-full">
          <Spinner />
        </div>
      ) : (
        renderContent()
      )}
    </div>
  );
}

export default FinancialTeachersInfo;
