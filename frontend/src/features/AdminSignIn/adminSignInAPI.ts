import { AxiosError } from "axios";
import axios from "../../axios/apiAdmin";

export const signInAdmin = (data: { email: string; password: string }) => {
  return axios
    .post("/api/admin/signin", data)
    .catch(function (error: AxiosError) {
      return error.response;
    });
};
