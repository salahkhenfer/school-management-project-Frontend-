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
import {
  addGroupApi,
  getGroupByTeacher,
  getGroups,
} from "../../apiCalls/GroupsCals";
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
import { useSelector } from "react-redux";
import { selectAuth } from "../../Redux/slices/authSlice";
import { getTeacherWithUser } from "../../apiCalls/teacherCalls";

function TeacherGroups() {
  const nav = useNavigate();
  const [list, setList] = useState([]);
  const pathname = useLocation().pathname;
  const [loadingGroups, setLoadingGroups] = useState(true);
  const { user } = useSelector(selectAuth);
  const [orignalList, setOrignalList] = useState([]);

  const fetchGroups = async () => {
    setLoadingGroups(true);

    try {
      const newList = await getTeacherWithUser(user); // Fetch the list of groups
      console.log(newList);

      const reversedList = [...newList.groups].reverse(); // Reverse the list once

      setList(reversedList); // Set the reversed list
      setOrignalList(reversedList); // Set the reversed list for original list
      console.log(reversedList);
    } catch (error) {
      console.error("Error fetching groups:", error);
    } finally {
      setLoadingGroups(false);
    }
  };
  useEffect(() => {
    fetchGroups(pathname);
  }, []);

  const [addGroup, setAddGroup] = useState(false);

  const handleClickGroup = (item) => {
    nav("" + item.id);
  };

  const [selectedFilter, setSelectedFilter] = useState("all");

  const filterGroups = (filter) => {
    switch (filter) {
      case "complete":
        setList(orignalList.filter((group) => group.isCompleted));
        break;
      case "incomplete":
        setList(orignalList.filter((group) => !group.isCompleted));
        break;
      default:
        setList(orignalList);
    }
  };

  useEffect(() => {
    filterGroups(selectedFilter);
  }, [selectedFilter]);
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

        <div className="flex w-full flex-wrap justify-end items-end md:flex-nowrap md:mb-0 gap-4">
          <Select
            label="فلترة الافواج"
            placeholder="اختر الفلتر"
            selectedKeys={[selectedFilter]}
            className="max-w-xs"
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <SelectItem key="all" value="all">
              كل الافواج
            </SelectItem>
            <SelectItem key="complete" value="complete">
              الافواج المكتملة
            </SelectItem>
            <SelectItem
              onClick={() => filterGroups("incomplete")}
              key="incomplete"
              value="incomplete"
            >
              الافواج الغير مكتملة
            </SelectItem>
          </Select>
        </div>
      </div>

      {loadingGroups ? (
        <div className="flex justify-center items-center w-full h-full">
          <Spinner />
        </div>
      ) : (
        <Table style={addGroup ? { filter: "blur(2px)" } : {}} isHeaderSticky>
          <TableHeader>
            <TableColumn key="name">الفوج</TableColumn>
            <TableColumn key="maxStudents">عدد التلاميذ</TableColumn>
            <TableColumn key="numberOfSessions">عدد الحصص</TableColumn>
          </TableHeader>
          <TableBody items={list}>
            {(item) => (
              <TableRow
                key={item.id}
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
                      ? item.teachers && item.teachers.length > 0
                        ? item.teachers?.slice(-1)[0]?.fullName // Access the fullName property directly
                        : "لم يحد بعد"
                      : getKeyValue(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default TeacherGroups;
