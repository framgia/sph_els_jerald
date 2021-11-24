import axios from "../../axios/api";

export const fetchGetProfile = (userId: number) => {
  return axios.get(`/api/users/profile/${userId}`);
};
