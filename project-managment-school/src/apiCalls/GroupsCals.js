import axios from "axios";

const getGroups = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/groups/getAllGroups",
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data.groups; // Return the response data on success
  } catch (err) {
    console.error("Failed to fetch groups:", err);
  }
};

const addGroupApi = async (group) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/groups/addGroup",
      { name: group },
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

export { getGroups, addGroupApi };
