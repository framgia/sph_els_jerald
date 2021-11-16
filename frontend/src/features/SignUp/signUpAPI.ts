import axios from "../../axios/api";
import { User } from "../../Types/User";

export const registerUser = (data: User) => {
  return axios.post("/api/users", data);
};
