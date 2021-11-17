import { AxiosError } from "axios";
import axios from "../../axios/api";
import { User } from "../../Types/User";

export const registerUser = (data: User) => {
  return axios.post("/api/users", data).catch(function (error: AxiosError) {
    return error.response;
  });
};
