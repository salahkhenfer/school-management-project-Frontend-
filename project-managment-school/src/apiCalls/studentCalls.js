import { data } from "autoprefixer";
import axios from "axios";

const deleteStudent = async (id) => {
  try {
    const response = await axios.delete(
      "http://localhost:3000/api/students/deleteStudent",
      {
        data: { id: id },
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Failed to delete student:", err);
  }
};

const getAllStudent = async (page) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/students/getAllStudents",
      { page: page },
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data.students; // افتراض أن `response.data` يحتوي على الحقول `students` و `totalStudents`
  } catch (err) {
    console.error("Failed to get all students:", err);
  }
};
const getStudentById = async (id) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/students/getStudentById",
      {
        id: id,
      },

      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data.student;
  } catch (err) {
    console.error("Failed to get student by id:", err);
  }
};
const addStudent = async (student) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/students/addStudent",
      student,
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Failed to add student:", err);
    return false;
  }
};
const searchStudentApi = async (name) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/students/searchStudent",
      {
        fullName: name,
      },

      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data.students;
  } catch (err) {
    console.error("Failed to search student:", err);
  }
};
export {
  deleteStudent,
  getAllStudent,
  getStudentById,
  addStudent,
  searchStudentApi,
};
