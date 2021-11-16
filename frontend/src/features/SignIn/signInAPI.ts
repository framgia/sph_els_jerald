import axios from "../../axios/api";

export const signInUser = (data: { email: string; password: string }) => {
  return axios.post("/api/users/signin", data).catch(function (error: any) {
    return error.response;
  });
};
