import {
  Autocomplete,
  AutocompleteItem,
  Button,
  TimeInput,
} from "@nextui-org/react";
import { Time } from "@internationalized/date";
import { MdDelete } from "react-icons/md";
import { FaCheck, FaEdit } from "react-icons/fa";
import { useState } from "react";

function LineAddTime({ index, onRemove }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const days = [
    { key: "1", label: "السبت" },
    { key: "2", label: "الاحد" },
    { key: "3", label: "الاثنين" },
    { key: "4", label: "الثلاثاء" },
    { key: "5", label: "الاربعاء" },
    { key: "6", label: "الخميس" },
    { key: "7", label: "الجمعة" },
  ];
  const locations = [
    { key: "1", label: "القاعة 1" },
    { key: "2", label: "القاعة 2" },
    { key: "3", label: "القاعة 3" },
    { key: "4", label: "القاعة 4" },
    { key: "5", label: "القاعة 5" },
  ];

  return (
    <div dir="rtl" className="flex  max-md:flex-col w-fit gap-5 h-fit my-5">
      <TimeInput
        color="primary"
        variant="bordered"
        className="ltrDiraction"
        style={{ direction: "ltr", backgroundColor: "transparent" }}
        defaultValue={new Time(11, 45)}
        label="من"
        isDisabled={isDisabled}
      />

      <TimeInput
        className="ltrDiraction"
        color="primary"
        variant="bordered"
        defaultValue={new Time(11, 45)}
        label="الى"
        isDisabled={isDisabled}
      />
      <Autocomplete
        color="primary"
        variant="bordered"
        label="ايام التوقيت"
        placeholder="اختر يوم"
        defaultItems={days}
        isDisabled={isDisabled}
      >
        {(item) => (
          <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
        )}
      </Autocomplete>
      <Autocomplete
        color="primary"
        variant="bordered"
        label="القاعة"
        placeholder="اختر قاعة"
        defaultItems={locations}
        isDisabled={isDisabled}
      >
        {(item) => (
          <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
        )}
      </Autocomplete>
      <div className="flex  gap-3">
        <Button
          color="danger"
          startContent={<MdDelete />}
          onClick={() => onRemove(index)}
        ></Button>
        {isDisabled ? (
          <Button
            onClick={() => setIsDisabled(false)}
            color="primary"
            startContent={<FaEdit />}
          ></Button>
        ) : (
          <Button
            onClick={() => setIsDisabled(true)}
            className="text-white"
            color="success"
            variant="solid"
            startContent={<FaCheck />}
          ></Button>
        )}
      </div>
    </div>
  );
}

export default LineAddTime;
