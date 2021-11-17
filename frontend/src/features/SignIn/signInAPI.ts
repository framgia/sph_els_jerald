import { AxiosError } from "axios";
import axios from "../../axios/api";

export const signInUser = (data: { email: string; password: string }) => {
  return axios
    .post("/api/users/signin", data)
    .catch(function (error: AxiosError) {
      return error.response;
    });
};
