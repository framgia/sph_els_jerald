import axios from "../../axios/api";

export const follow = (followId: number) => {
  return axios.post(`/api/users/follow/${followId}`);
};

export const unfollow = (followId: number) => {
  return axios.post(`/api/users/unfollow/${followId}`);
};
