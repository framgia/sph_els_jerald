import { User } from "../../Types/User";

const axios = require("axios").default;

export const registerUser = (data: User) => {
  return axios.post("http://127.0.0.1:8000/api/users", data);
};
