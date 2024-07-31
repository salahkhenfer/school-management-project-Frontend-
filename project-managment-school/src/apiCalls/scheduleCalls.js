import axios from "axios";

const getAllFreeRegiments = async ({
  startDate,
  endDate,
  endTime,
  startTime,
  day,
}) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/schedules/getAllFreeRegiments",
      {
        startDate,
        endDate,
        endTime,
        startTime,
        day,
      },
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data.freeRegiments; // Return an empty array if groups are not found
  } catch (err) {
    console.error("Failed to fetch groups:", err);
    return []; // Return an empty array in case of an error
  }
};

const addSchedule = async (schedule) => {
  try {
    if (schedule.id) {
      const updatedSchedule = await updateSchedule({
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        day: schedule.day,
        location: schedule.location,
        id: schedule.id,
      });
      console.log(updatedSchedule);

      return;
    }
    if (schedule.group) {
      const response = await axios.post(
        "http://localhost:3000/api/schedules/addSchedule",
        {
          regimentId: schedule.regiment,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          day: schedule.day,
          location: schedule.location,
          groupID: schedule.group,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data.schedule);
      return response.data.schedule;
    }
  } catch (err) {
    console.error("Failed to add group:", err);
  }
};

const deleteSchedule = async (id) => {
  try {
    const response = await axios.delete(
      "http://localhost:3000/api/schedules/deleteSchedule",

      {
        data: { id },
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Failed to delete schedule:", err);
  }
};
const getSchedule = async (id) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/schedules/getScheduleById`,
      { id },
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data.schedule;
  } catch (err) {
    console.error("Failed to fetch schedule:", err);
  }
};
const updateSchedule = async ({ id, startTime, endTime, day, location }) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/schedules/updateSchedule`,
      { id, startTime, endTime, day, location },

      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Failed to update schedule:", err);
  }
};
export {
  getAllFreeRegiments,
  updateSchedule,
  addSchedule,
  deleteSchedule,
  getSchedule,
};
