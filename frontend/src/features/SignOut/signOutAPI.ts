import { AxiosError } from "axios";
import axios from "../../axios/api";

export const signOutUser = () => {
  return axios.post("/api/users/signout").catch(function (error: AxiosError) {
    return error.response;
  });
};
