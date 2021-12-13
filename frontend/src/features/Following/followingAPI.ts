import axios from "../../axios/api";

export const fetchFollowing = (userId: number) => {
  return axios.get(`/api/users/following/${userId}`);
};
