import axios from "../../axios/api";
import { User } from "../../Types/User";

export const registerUser = (data: User) => {
  return axios.post("/api/users", data).catch(function (error: any) {
    return error.response;
  });
};
