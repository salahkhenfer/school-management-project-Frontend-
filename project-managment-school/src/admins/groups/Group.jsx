import {
  Button,
  getKeyValue,
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
import { useState } from "react";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

function Group() {
  const initialList = [
    { name: "صلاح الدين خنفر", birth_year: "01/11/2002" },
    { name: "محمد العربي", birth_year: "01/11/2002" },
    { name: "علي العربي", birth_year: "01/11/2002" },
    { name: "محمود العربي", birth_year: "01/11/2002" },
    { name: "حسن العربي", birth_year: "01/11/2002" },
  ];
  const [list, setList] = useState(initialList);

  const [lines, setLines] = useState([]);

  const addLine = async () => {
    await Swal.fire({
      position: "center",
      icon: "success",
      title: "تم اضافة التوقيت بنجاح",
      showConfirmButton: false,
      timer: 1500,
    });
    setLines([...lines, { key: lines.length }]);
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

  const onRemoveList = async (index) => {
    await Swal.fire({
      position: "center",
      icon: "success",
      title: "تم حذف الطالب بنجاح",
      showConfirmButton: false,
      timer: 1500,
    });
    setList((prevList) => prevList.filter((_, i) => i !== index));
  };
  const handlePrint = () => {
    const worksheet = XLSX.utils.json_to_sheet(list);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "data.xlsx"); // or 'data.xls' for XLS format
  };

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
          اسم الاستاذ: <span>احمد</span>
        </div>
        <div>
          عدد الطلاب: <span>30</span>
        </div>
      </div>
      <div className="text-xl py-3 font-bold">
        <div>توقيت الدورة:</div>
        <div className="w-full py-3 ">
          {lines.length === 0 ? (
            <div className="text-center text-xl text-gray-500">
              حاليا لا يوجد توقيت
            </div>
          ) : (
            lines?.map((line, index) => (
              <LineAddTime key={line.key} index={index} onRemove={removeLine} />
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
          <TableColumn key="name">اسم التلميذ</TableColumn>
          <TableColumn key="birth_year">تاريخ الميلاد</TableColumn>
          <TableColumn key="action">العمليات</TableColumn>
        </TableHeader>
        <TableBody items={list}>
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
              key={item.name}
            >
              {(columnKey) => (
                <TableCell className="text-right h-7">
                  {columnKey === "index" && parseInt(list.indexOf(item)) + 1}
                  {columnKey === "action" ? (
                    <div className="flex ">
                      <Button
                        color="danger"
                        startContent={<MdDelete />}
                        onClick={() => onRemoveList(list.indexOf(item))}
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

export default Group;
