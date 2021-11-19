import { AxiosError } from "axios";
import axios from "../../axios/apiAdmin";

export const signOutAdmin = () => {
  return axios.post("/api/admin/signout").catch(function (error: AxiosError) {
    return error.response;
  });
};
