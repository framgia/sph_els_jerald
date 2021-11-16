import axios from "../../axios/api";

export const fetchQuizDetail = (quizId: number) => {
  return axios.get(`/api/quizzes/${quizId}`);
};

export const fetchQuestions = (quizId: number) => {
  return axios.get(`/api/quizzes/${quizId}/questions`);
};
