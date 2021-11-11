const axios = require("axios").default;

export const fetchQuizDetail = (quizId: number) => {
  return axios.get(`http://127.0.0.1:8000/api/quizzes/${quizId}`);
};
export const fetchQuestions = (quizId: number) => {
  return axios.get(`http://127.0.0.1:8000/api/quizzes/${quizId}`);
};
