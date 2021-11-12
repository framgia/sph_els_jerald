const axios = require("axios").default;

export const fetchAdminQuizzes = (page: number) => {
  return axios.get(`http://127.0.0.1:8000/api/admin/quizzes?page=${page}`);
};
