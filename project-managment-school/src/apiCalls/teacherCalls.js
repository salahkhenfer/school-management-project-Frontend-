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
      {
        name: teacher.name,
        email: teacher.email,
        phone: teacher.phone,
        address: teacher.address,
      },

      {
        withCredentials: true,
      }
    );

    console.log(response.data);

    return response.data;
  } catch (err) {
    console.error("Failed to add teacher:", err);
  }
};
export { getAllTeachers, addTeacherApi };
