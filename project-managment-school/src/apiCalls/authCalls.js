import axios from "axios";

export const LoginApi = async (username, password) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/login",
      {
        username: username,
        password: password,
      },
      {
        withCredentials: true,
      }
    );
    console.log(response.data.user);
    return response.data.user;
  } catch (err) {
    console.error(err);
    throw new Error(
      "Login failed. Please check your credentials and try again."
    );
  }
};

export const checkauthApi = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/auth/protected",

      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data; // Return the response data on success
  } catch (err) {
    console.error("Failed to fetch protected data:", err);
  }
};

export const LogoutApi = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response; // Return the response data on success
  } catch (err) {
    console.error("Failed to logout:", err);
  }
};
