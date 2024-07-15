import axios from "axios";

export const LoginApi = ({ username, password }) => {
  axios
    .post("http://localhost:3000/api/auth/login", {
      username,
      password,
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
