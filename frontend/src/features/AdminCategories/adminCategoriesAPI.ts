import axios from "../../axios/apiAdmin";

export const fetchAdminQuizzes = (page: number) => {
  return axios.get(`/api/admin/quizzes?page=${page}`);
};

export const fetchAdminQuiz = (quizId: number) => {
  return axios.get(`/api/admin/quizzes/${quizId}`);
};

export const saveAdminQuiz = (data: { title: string; description: string }) => {
  return axios.post("/api/admin/quizzes", data);
};

export const deleteAdminQuiz = (quizId: number) => {
  return axios.delete(`/api/admin/quizzes/${quizId}`);
};

export const updateAdminQuiz = (
  quizId: number,
  data: { title: string; description: string }
) => {
  return axios.patch(`/api/admin/quizzes/${quizId}`, data);
};
