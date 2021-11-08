const axios = require("axios").default;

export const fetchQuiz = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/quizzes");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
