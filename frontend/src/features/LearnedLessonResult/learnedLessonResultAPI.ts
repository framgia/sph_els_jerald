import axios from "../../axios/api";

export const fetchLearnedLessonResult = (quizId: number) => {
  return axios.get(`/api/users/learned-lessons/${quizId}`);
};
