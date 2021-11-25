import axios from "../../axios/api";

export const fetchUsers = () => {
  return axios.get("/api/users");
};
