import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Spinner,
  TimeInput,
} from "@nextui-org/react";
import { Time } from "@internationalized/date";
import { MdDelete } from "react-icons/md";
import { FaCheck, FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import {
  addSchedule,
  deleteSchedule,
  getAllFreeRegiments,
  getSchedule,
  updateSchedule,
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
  lines,
  setLines,
}) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [roomIsAvilabel, setRoomIsAvilabel] = useState(false);
  const [locations, setLocations] = useState([]);
  const [LoadingRoom, setLoadingRoom] = useState(false);
  const [schedule, setSchedule] = useState();
  const [ID, setID] = useState(id);

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
      const fetchedSchedule = await getSchedule(id);
      setSchedule(fetchedSchedule);
      console.log(fetchedSchedule);
    } catch (error) {
      console.error("Error getting schedule:", error);
    }
  };

  useEffect(() => {
    if (ID) {
      getScheduleAPi();
      setIsDisabled(true);
      setRoomIsAvilabel(true);
    }
  }, [ID]);

  const handelAddSchedule = async ({
    timeFrom,
    timeTo,
    day,
    location,
    regimentId,
    group,
  }) => {
    if (roomIsAvilabel) {
      setIsDisabled(!isDisabled);
      if (isDisabled) {
        setRoomIsAvilabel(false);
      }
    }
    try {
      console.log(ID);
      if (ID) {
        const updatedSchedule = await updateSchedule({
          startTime: timeFrom,
          endTime: timeTo,
          day,
          location,
          id: ID,
        });
        console.log(updatedSchedule);
        return;
      }
      const addScheduleResult = await addSchedule({
        startTime: timeFrom,
        endTime: timeTo,
        day,
        location,
        regiment: regimentId,
        group,
        id: ID,
      });

      console.log(addScheduleResult);
      fatchGroup();
      // setID(addScheduleResult.id);
    } catch (error) {
      console.error("Error adding schedule:", error);
    }
  };

  const handleSearchRoom = async (values) => {
    setLoadingRoom(true);
    const getFreeRegiments = await getAllFreeRegiments({
      startDate,
      endDate,
      startTime: formatTime(values.timeFrom),
      endTime: formatTime(values.timeTo),
      day: values.day,
    });
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
      // onRemove(index);
      setLines(lines.filter((line) => line.id !== index));
      console.log(deleteScheduleResult);
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={
        schedule
          ? {
              timeFrom: new Time(
                schedule.startTime.split(":")[0],
                schedule.startTime.split(":")[1]
              ),
              timeTo: new Time(
                schedule.endTime.split(":")[0],
                schedule.endTime.split(":")[1]
              ),
              day: schedule.day,
              location: schedule.location,
            }
          : {
              timeFrom: "",
              timeTo: "",
              day: "",
              location: "",
            }
      }
      onSubmit={(values) => {
        const formattedValues = {
          ...values,
          timeFrom: formatTime(values.timeFrom),
          timeTo: formatTime(values.timeTo),
          group: groupID,
          location: values.location,
          regimentId: values.regiment,
        };
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
                  hourCycle={24}
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
                  hourCycle={24}
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
                  placeholder={field.value || "اختر يوم"}
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
              isDisabled={isDisabled}
              onClick={() => handleSearchRoom(values)}
            >
              {LoadingRoom ? (
                <Spinner color="white" />
              ) : (
                <div>بحث عن القاعة</div>
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
                    placeholder={field.value || "اختر القاعة"}
                    value={field.value}
                    defaultItems={locations}
                    isDisabled={isDisabled}
                    onChange={(value) => setFieldValue("location", value)}
                  >
                    {(item) => (
                      <AutocompleteItem
                        onClick={() => {
                          setFieldValue("location", item.name);
                          setFieldValue("regiment", item.id);
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
                roomIsAvilabel &&
                values.timeFrom &&
                values.timeTo &&
                values.day &&
                values.location &&
                values.regiment && (
                  <Button
                    type="submit"
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
