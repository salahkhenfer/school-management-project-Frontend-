import axios from "axios";

const addParent = async (parent) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/parents/addParent",
      {
        fullName: parent.fullName,
        phoneNumber: parent.phoneNumber,
        email: parent.email,
        password: parent.password,
        studentId: parent.studentId,
      },
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Failed to add parent:", err);
    return false;
  }
};
const addStudentInToParent = async (phoneNumber, studentId) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/parents/addStudentInToParent",
      {
        studentId: studentId,
        phoneNumber,
      },
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Failed to add student to parent:", err);
    return false;
  }
};
const deleteStudentForParent = async (info) => {
  try {
    const response = await axios.delete(
      "http://localhost:3000/api/parents/deleteStudentForParent",

      {
        data: info,
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Failed to delete student for parent:", err);
  }
};
export { addParent, addStudentInToParent, deleteStudentForParent };
