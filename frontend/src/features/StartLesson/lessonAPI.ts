const axios = require("axios").default;

export const fetchQuizDetail = async (quizId: number) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/quizzes/${quizId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchQuestions = async (quizId: number) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/quizzes/${quizId}/questions`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
