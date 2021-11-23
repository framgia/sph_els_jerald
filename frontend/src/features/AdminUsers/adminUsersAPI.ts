import axios from "../../axios/apiAdmin";

export const fetchAdminUsers = (page: number) => {
  return axios.get(`/api/admin/users?page=${page}`);
};
