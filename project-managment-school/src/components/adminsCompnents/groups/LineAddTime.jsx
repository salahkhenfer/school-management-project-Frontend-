import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Spinner,
  TimeInput,
} from "@nextui-org/react";
import { Time } from "@internationalized/date";
import { MdDelete } from "react-icons/md";
import { FaCheck, FaCheckCircle, FaCheckDouble, FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  addSchedule,
  deleteSchedule,
  getAllFreeRegiments,
  getSchedule,
} from "../../../apiCalls/scheduleCalls";

function LineAddTime({
  id,
  onRemove,
  groupID,
  fatchGroup,
  startDate,
  endDate,
  line,
  setGroup,
  group,
}) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [roomIsAvilabel, setRoomIsAvilabel] = useState(false);
  const [locations, setLocations] = useState([]);
  const [LoadingRoom, setLoadingRoom] = useState(false);
  const [schedule, setSchedule] = useState({
    id: 10,
    day: "الاربعاء",
    startTime: "08:00:00",
    endTime: "10:00:00",
    location: "Gym A",
    startDate: "0223-04-02T23:46:25.000Z",
    endDate: "4222-03-04T00:00:00.000Z",
    createdAt: "2024-07-23T10:05:12.000Z",
    updatedAt: "2024-07-23T10:05:12.000Z",
    groupId: null,
  });

  const days = [
    { key: "1", label: "السبت" },
    { key: "2", label: "الاحد" },
    { key: "3", label: "الاثنين" },
    { key: "4", label: "الثلاثاء" },
    { key: "5", label: "الاربعاء" },
    { key: "6", label: "الخميس" },
    { key: "7", label: "الجمعة" },
  ];
  const getScheduleAPi = async () => {
    try {
      const response = await getSchedule(id);
      console.log(response);
      setSchedule(response);
      console.log(id);
    } catch (error) {
      console.error("Error getting schedule:", error);
    }
  };

  useEffect(() => {
    getScheduleAPi();

    setSchedule(line);
  }, []);
  const handelAddSchedule = async ({
    timeFrom,
    timeTo,
    day,
    location,
    regimentId,
    group,
  }) => {
    console.log(line);
    if (roomIsAvilabel) {
      setIsDisabled(!isDisabled);
      if (isDisabled) {
        setRoomIsAvilabel(false);
      }
    }
    console.log({
      timeFrom,
      timeTo,
      day,
      location,
      regimentId,
      group,
    });
    try {
      const addScheduleResult = await addSchedule({
        startTime: timeFrom,
        endTime: timeTo,
        day,
        location,
        regiment: regimentId,
        group,
      });

      console.log(addScheduleResult);
    } catch (error) {
      console.error("Error adding schedule:", error);
    }
  };

  const handleSearchRoom = async (values) => {
    setLoadingRoom(true);
    console.log({
      timeFrom: formatTime(values.timeFrom),
      timeTo: formatTime(values.timeTo),
      day: values.day,
    });
    const getFreeRegiments = await getAllFreeRegiments({
      startDate,
      endDate,
      startTime: formatTime(values.timeFrom),
      endTime: formatTime(values.timeTo),
      day: values.day,
    });
    console.log(getFreeRegiments);
    setLocations(getFreeRegiments);

    setRoomIsAvilabel(true);
    setLoadingRoom(false);
  };
  function formatTime(time) {
    if (
      !time ||
      typeof time.hour === "undefined" ||
      typeof time.minute === "undefined"
    )
      return "";
    const hours = time.hour.toString().padStart(2, "0");
    const minutes = time.minute.toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  const handleRemove = async (index) => {
    try {
      const deleteScheduleResult = await deleteSchedule(index);
      onRemove(index);
      console.log(deleteScheduleResult);
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };

  return (
    <Formik
      initialValues={
        id
          ? {
              timeFrom: schedule?.startTime,
              timeTo: schedule?.endTime,
              day: schedule?.day,
              location: schedule?.location,
            }
          : {
              timeFrom: "",
              timeTo: "",
              day: "",
              location,
            }
      }
      onSubmit={(values) => {
        // Handle form submission

        console.log({
          ...values,
          timeFrom: formatTime(values.timeFrom),
          timeTo: formatTime(values.timeTo),
        });
        const formattedValues = {
          ...values,
          timeFrom: formatTime(values.timeFrom),
          timeTo: formatTime(values.timeTo),
          group: groupID,
          location: values.location,
          regimentId: values.location,
        };
        console.log(formattedValues);
        handelAddSchedule(formattedValues);
      }}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <div
            dir="rtl"
            className="flex max-md:flex-col w-fit gap-5 h-fit my-5"
          >
            <Field name="timeFrom">
              {({ field }) => (
                <TimeInput
                  {...field}
                  color="primary"
                  variant="bordered"
                  className="ltrDiraction"
                  style={{ direction: "ltr", backgroundColor: "transparent" }}
                  label="من"
                  isDisabled={isDisabled}
                  selected={field.value}
                  onChange={(date) => setFieldValue("timeFrom", date)}
                />
              )}
            </Field>

            <Field name="timeTo">
              {({ field }) => (
                <TimeInput
                  {...field}
                  type="time"
                  color="primary"
                  variant="bordered"
                  className="ltrDiraction"
                  label="الى"
                  isDisabled={isDisabled}
                  selected={field.value}
                  onChange={(date) => setFieldValue("timeTo", date)}
                />
              )}
            </Field>

            <Field name="day">
              {({ field }) => (
                <Autocomplete
                  {...field}
                  color="primary"
                  variant="bordered"
                  label="ايام التوقيت"
                  placeholder="اختر يوم"
                  defaultItems={days}
                  isDisabled={isDisabled}
                  selected={field.value}
                >
                  {(item) => (
                    <AutocompleteItem
                      onClick={() => setFieldValue("day", item.label)}
                      key={item.key}
                    >
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            </Field>

            <Button
              className="w-1/2 px-10"
              color="primary"
              startContent={<FaCheck />}
              onClick={() => handleSearchRoom(values)}
            >
              {LoadingRoom ? (
                <Spinner color="white" />
              ) : (
                <div> بحث عن القاعة</div>
              )}
            </Button>
            {roomIsAvilabel && !LoadingRoom && (
              <Field name="location">
                {({ field }) => (
                  <Autocomplete
                    {...field}
                    color="primary"
                    variant="bordered"
                    label="القاعة"
                    placeholder="اختر قاعة"
                    defaultItems={locations}
                    isDisabled={isDisabled}
                    // onClick={(value) => console.log("hello")}

                    onBlur={(value) => console.log("hello")}
                    onChange={(value) => setFieldValue("location", value)}
                  >
                    {(item) => (
                      <AutocompleteItem
                        onClick={() => {
                          setFieldValue("location", item.id);
                          setFieldValue("regimentId", item.name);
                        }}
                        key={item.id}
                      >
                        {item.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                )}
              </Field>
            )}

            <div className="flex gap-3">
              <Button
                color="danger"
                startContent={<MdDelete />}
                onClick={() => handleRemove(id)}
              ></Button>
              {!isDisabled ? (
                roomIsAvilabel && (
                  <Button
                    type="submit"
                    // onClick={handelAddSchedule}
                    className="text-white"
                    color="success"
                    variant="solid"
                    startContent={<FaCheck />}
                  ></Button>
                )
              ) : (
                <Button
                  onClick={handelAddSchedule}
                  className="text-white"
                  color="warning"
                  variant="solid"
                  startContent={<FaEdit />}
                ></Button>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default LineAddTime;
5;
