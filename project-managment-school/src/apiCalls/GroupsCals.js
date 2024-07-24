import axios from "axios";

const getGroupById = async (id) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/groups/getGroupByID`,
      { id: id }, // Send the group ID in the request body
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data.group; // Return an empty object if group is not found
  } catch (err) {
    console.error("Failed to fetch group:", err);
    return {}; // Return an empty object in case of an error
  }
};

const getGroups = async (theRest) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/groups/getAllGroups`,
      { theRest: theRest }, // Send theRest in the request body
      {
        withCredentials: true,
      }
    );

    return response.data.groups; // Return an empty array if groups are not found
  } catch (err) {
    console.error("Failed to fetch groups:", err);
    return []; // Return an empty array in case of an error
  }
};

const addGroupApi = async (group) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/groups/addGroup",
      {
        name: group.groupName,
        price: group.price,
        numberOfSessions: group.numberOfSessions,
        maxStudents: group.studentCount,
        startDate: group.startDate,
        endDate: group.endDate,
        location: "prisentiel",
        isCompleted: false,
        teacher: group.teacher,
        paymentMethod: group.paymentMethod,
        theRest: group.theRest,
        type: group.type,
      },
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Failed to add group:", err);
  }
};

export { getGroups, addGroupApi, getGroupById };
