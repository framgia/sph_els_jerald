import axios from "../../axios/api";

export const fetchLearnedWords = (userId: number) => {
  return axios.get(`/api/users/learned-words/${userId}`);
};
