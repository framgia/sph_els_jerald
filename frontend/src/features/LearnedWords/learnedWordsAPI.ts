import axios from "../../axios/api";

export const fetchLearnedWords = () => {
  return axios.get(`/api/users/learned-words`);
};
