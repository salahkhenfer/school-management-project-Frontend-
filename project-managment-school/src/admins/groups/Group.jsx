import {
  Button,
  getKeyValue,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { FaCheck, FaEdit, FaPrint } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import LineAddTime from "../../components/adminsCompnents/groups/LineAddTime";
import { IoAdd } from "react-icons/io5";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { getGroupById } from "../../apiCalls/GroupsCals";
import { useParams } from "react-router-dom";

function Group() {
  const [group, setGroup] = useState({});
  const { groupParams } = useParams();
  const [loading, setLoading] = useState(true);
  const initialList = [
    { name: "صلاح الدين خنفر", birth_year: "01/11/2002" },
    { name: "محمد العربي", birth_year: "01/11/2002" },
    { name: "علي العربي", birth_year: "01/11/2002" },
    { name: "محمود العربي", birth_year: "01/11/2002" },
    { name: "حسن العربي", birth_year: "01/11/2002" },
  ];
  const [list, setList] = useState(initialList);
  const [lines, setLines] = useState([]);
  const [student, setStudent] = useState([]);

  const addLine = async () => {
    setLines([...lines, { id: null }]);
  };

  const removeLine = async (index) => {
    await Swal.fire({
      position: "center",
      icon: "success",
      title: "تم الحذف التوقيت بنجاح",
      showConfirmButton: false,
      timer: 1500,
    });
    setLines(lines.filter((_, i) => i !== index));
  };

  const onRemoveList = async (index, id) => {
    setStudent((prevList) => prevList.filter((_, i) => i !== index));
    await Swal.fire({
      position: "center",
      icon: "success",
      title: "تم حذف الطالب بنجاح",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const handlePrint = () => {
    const worksheet = XLSX.utils.json_to_sheet(list);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "data.xlsx"); // or 'data.xls' for XLS format
  };

  const fatchGroup = async () => {
    setLoading(true);

    const response = await getGroupById(groupParams);
    setGroup(response);
    setLines(response.schedules);
    console.log(response.Students);
    setStudent(response.Students);
    setLoading(false);
  };

  useEffect(() => {
    fatchGroup();
  }, []);
  if (loading) {
    return (
      <div className="w-full h-full ">
        <Spinner className="mx-auto" />
      </div>
    );
  } else {
    return (
      <div>
        <div className="flex  max-md:flex-col justify-between items-center">
          <div className="text-3xl max-md:py-4 font-bold">الفوج</div>
          <div className="flex  max-md:flex-col gap-3">
            <Button color="danger" startContent={<MdDelete />}>
              حذف الفوج
            </Button>
            <Button
              // onClick={handlePrint}
              onClick={handlePrint}
              color="primary"
              startContent={<FaPrint />}
            >
              طباعة الفوج
            </Button>
            <Button
              className="text-white"
              color="success"
              variant="solid"
              startContent={<FaCheck />}
            >
              تم الانتهاء من دورة
            </Button>
          </div>
        </div>
        <div className="text-xl">
          <div>
            اسم الاستاذ:{" "}
            <span>{group?.Teachers?.[0]?.name || "غير متوفر"}</span>
          </div>
          <div>
            عدد الطلاب: <span>{group?.maxStudents || "غير متوفر"}</span>
          </div>
        </div>
        <div className="text-xl py-3 font-bold">
          <div>توقيت الدورة:</div>
          <div className="w-full py-3 ">
            {!Array.isArray(lines?.schedules) &&
            !group.schedules.length === 0 ? (
              <div className="text-center text-xl text-gray-500">
                حاليا لا يوجد توقيت
              </div>
            ) : (
              Array.isArray(lines) &&
              lines.map((line, index) => (
                <LineAddTime
                  groupID={group.id}
                  id={line.id}
                  key={line.key}
                  index={index}
                  onRemove={removeLine}
                  startDate={group.startDate}
                  endDate={group.endDate}
                  fatchGroup={fatchGroup}
                  setGroup={setGroup}
                  group={group}
                />
              ))
            )}
          </div>
          <Button color="primary" startContent={<IoAdd />} onClick={addLine}>
            اضافة توقيت
          </Button>
        </div>
        <div className="flex my-10  justify-between w-full items-center">
          <div
            className="
      font-bold
      text-3xl
      text-right
      "
          >
            الافواج
          </div>
        </div>
        <Table isHeaderSticky>
          <TableHeader>
            <TableColumn key="index">رقم التلميذ</TableColumn>
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
              >
                {(columnKey) => (
                  <TableCell className="text-right h-7">
                    {columnKey === "index" &&
                      parseInt(student.indexOf(item)) + 1}
                    {columnKey === "action" ? (
                      <div className="flex ">
                        <Button
                          color="danger"
                          startContent={<MdDelete />}
                          onClick={() =>
                            onRemoveList(student.indexOf(item), item.id)
                          }
                        >
                          {" "}
                          <div className="max-md:hidden">
                            حذف التلميذ من القائمة{" "}
                          </div>
                        </Button>
                      </div>
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
      </div>
    );
  }
}

export default Group;
