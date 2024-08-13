import axios from "axios";

const getAllTeachers = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/teachers/GetAllTeacher",
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data.teachers; // Return the response data on success
  } catch (err) {
    console.error("Failed to fetch teachers:", err);
    return false;
  }
};

const addTeacherApi = async (teacher) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/teachers/AddTeacher",
      teacher, // Pass the teacher object directly

      {
        withCredentials: true,
      }
    );

    console.log(response);

    return response;
  } catch (err) {
    console.error("Failed to add teacher:", err);
    // Optional: you can return the error if you want to handle it further upstream
    return err.response; // or throw err; if you want to propagate the error
  }
};

const deleteTeacherApi = async (teacherId) => {
  console.log(teacherId);
  try {
    const response = await axios.delete(
      "http://localhost:3000/api/teachers/DeleteTeacher",
      {
        data: { id: teacherId },
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Failed to delete teacher:", err);
  }
};
const getTeacherById = async (teacherId) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/teachers/getTeacherById`,
      {
        id: teacherId,
      },
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data.teacher;
  } catch (err) {
    console.error("Failed to get teacher:", err);
  }
};
const searchTeacherApi = async (teacher) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/Teachers/searchTeachers",
      {
        fullName: teacher,
      },

      {
        withCredentials: true,
      }
    );
    console.log(response);
    return response.data.teachers;
  } catch (err) {
    console.error("Failed to search teacher:", err);
    return false;
  }
};
const countTeachers = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/teachers/countTeachers",
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data.count; // Return the response data on success
  } catch (err) {
    console.error("Failed to fetch teachers:", err);
    return false;
  }
};
export {
  getAllTeachers,
  addTeacherApi,
  deleteTeacherApi,
  getTeacherById,
  searchTeacherApi,
  countTeachers,
};
