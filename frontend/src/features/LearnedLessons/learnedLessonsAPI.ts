import axios from "../../axios/api";

export const fetchLearnedLessons = () => {
  return axios.get(`/api/users/learned-lessons`);
};
