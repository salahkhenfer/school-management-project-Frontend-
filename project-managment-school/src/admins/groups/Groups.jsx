import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
function Groups() {
  const nav = useNavigate();
  const list = {
    items: [
      {
        name: "الفوج الاول",
        height: "احمد",
        mass: "25",
        birth_year: "القاعة 1",
      },
      {
        name: "الفوج الثاني",
        height: "محمد",
        mass: "30",
        birth_year: "القاعة 2",
      },
      {
        name: "الفوج الثالث",
        height: "علي",
        mass: "20",
        birth_year: "القاعة 3",
      },
      {
        name: "الفوج الرابع",
        height: "محمود",
        mass: "15",
        birth_year: "القاعة 4",
      },
      {
        name: "الفوج الخامس",
        height: "حسن",
        mass: "10",
        birth_year: "القاعة 5",
      },
    ],
  };
  const data = [
    { label: "احمد", value: "احمد" },
    { label: "محمد", value: "محمد" },
    { label: "علي", value: "علي" },
    { label: "محمود", value: "محمود" },
    { label: "حسن", value: "حسن" },
  ];
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
          <TableColumn key="height"> اسم الاستاذ</TableColumn>
          <TableColumn key="mass">عدد التلاميذ</TableColumn>
          <TableColumn key="birth_year">القاعة</TableColumn>
        </TableHeader>
        <TableBody items={list.items}>
          {(item) => (
            <TableRow
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
              key={item.name}
            >
              {(columnKey) => (
                <TableCell
                  className="
                text-right
                h-7
                
                "
                >
                  {getKeyValue(item, columnKey)}
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
        <div className="md:w-96 max-md:w-full   h-fit md:px-12 z-50 md:py-2 md:top-[5%] md:left-[30%] top-0 left-0  absolute  bg-gray-200 rounded-3xl justify-start items-center inline-flex">
          <div className="max-md:w-full  p-4 self-stretch flex-col justify-start items-end gap-4 inline-flex">
            <div className="self-stretch text-center text-gray-800 text-3xl font-semibold font-['Cairo'] leading-10">
              إضافة فوج
            </div>
            <div className="flex w-full flex-col flex-wrap md:flex-nowrap gap-4">
              <Input type="text" label="اسم الفوج" />
              <DatePicker label="تاريخ البدأ" variant="flat" />
              <DatePicker label="تاريخ الانتهاء" variant="flat" />

              <Input type="text" label="عدد التلاميذ في الفوج" />
              <Autocomplete
                size="sm"
                label="ابحث عن استاذ"
                defaultItems={data}
                className="max-w-xs"
              >
                {(item) => (
                  <AutocompleteItem key={item.value}>
                    {item.label}
                  </AutocompleteItem>
                )}
              </Autocomplete>
              <RadioGroup
                classNames={{
                  base: cn(" flex w-full  gap-4"),
                }}
                label="اختر طريقة الدفع"
              >
                <div className="flex gap-2">
                  <Radio
                    value={1}
                    classNames={{
                      base: cn(
                        " m-0 bg-content1 w-fit hover:bg-content2 items-center justify-between",
                        "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg p-2 gap-2 border-2 border-transparent",
                        "data-[selected=true]:border-primary"
                      ),
                    }}
                  >
                    دفع بالحصة
                  </Radio>
                  <Radio
                    value={2}
                    classNames={{
                      base: cn(
                        " m-0 bg-content1     w-fit hover:bg-content2 items-center justify-between",
                        "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-2  border-2 border-transparent",
                        "data-[selected=true]:border-primary"
                      ),
                    }}
                  >
                    دفع بالحصة
                  </Radio>
                </div>
              </RadioGroup>
            </div>
            <div className="flex w-full gap-2 justify-between items-center ">
              <div
                onClick={handelAdd}
                className=" w-full text-center cursor-pointer px-8 py-2 bg-indigo-500 rounded-2xl justify-center items-center gap-2 "
              >
                <div className="text-center text-white text-base font-semibold font-['Cairo'] leading-normal">
                  اضافة{" "}
                </div>
              </div>
              <div
                onClick={handelCancel}
                className=" cursor-pointer w-full px-8 py-2 bg-red-600 rounded-2xl justify-center items-center gap-2 "
              >
                <div className="text-center text-white text-base font-semibold font-['Cairo'] leading-normal">
                  الغاء
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Groups;
