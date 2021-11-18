import axios from "../../axios/api";

export const fetchAdminQuizQuestions = (quizId: number, page: number) => {
  return axios.get(`/api/admin/quizzes/${quizId}/questions?page=${page}`);
};

export const fetchAdminQuizQuestion = (questionId: number) => {
  return axios.get(`/api/admin/quizzes/questions/${questionId}`);
};

export const saveAdminQuizQuestions = (
  data: { word: string; choices: { value: string; is_correct: boolean }[] },
  quizId: number
) => {
  return axios.post(`/api/admin/quizzes/${quizId}/questions`, data);
};

export const deleteAdminQuizQuestion = (questionId: number) => {
  return axios.delete(`/api/admin/quizzes/questions/${questionId}`);
};
