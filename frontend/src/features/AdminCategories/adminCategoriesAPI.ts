const axios = require("axios").default;

export const fetchAdminQuizzes = (page: number) => {
  return axios.get(`http://127.0.0.1:8000/api/admin/quizzes?page=${page}`);
};

export const saveAdminQuiz = (data: { title: string; description: string }) => {
  return axios.post("http://127.0.0.1:8000/api/admin/quizzes", data);
};

export const deleteAdminQuiz = (quizId: number) => {
  return axios.delete(`http://127.0.0.1:8000/api/admin/quizzes/${quizId}`);
};

export const updateAdminQuiz = (
  quizId: number,
  data: { title: string; description: string }
) => {
  return axios.patch(`http://127.0.0.1:8000/api/admin/quizzes/${quizId}`, data);
};
