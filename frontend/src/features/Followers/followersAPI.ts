import axios from "../../axios/api";

export const fetchFollowers = (userId: number) => {
  return axios.get(`/api/users/followers/${userId}`);
};
