import axios from "../../axios/api";

export const signOutUser = () => {
  return axios.post("/api/users/signout").catch(function (error: any) {
    return error.response;
  });
};
