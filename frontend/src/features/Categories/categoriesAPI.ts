const axios = require("axios").default;

export const fetchQuiz = () => {
  return axios.get("http://127.0.0.1:8000/api/quizzes");
};
