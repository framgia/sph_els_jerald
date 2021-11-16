import axios from "../../axios/api";

export const fetchQuiz = () => {
  return axios.get("/api/quizzes");
};
