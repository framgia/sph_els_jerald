import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchQuizDetail, fetchQuestions } from "./lessonAPI";
import { Quiz, QuizInitial } from "../../Types/Quiz";
import { Question, QuestionInitial } from "../../Types/Question";

export interface LessonState {
  quiz: Quiz;
  questions: Question[];
  status: "idle" | "loading" | "failed";
  errCode?: string;
}

const initialState: LessonState = {
  quiz: QuizInitial,
  questions: [QuestionInitial],
  status: "idle",
};

export const fetchQuizDetailAsync = createAsyncThunk(
  "lesson/fetchQuizDetail",
  async (quizId: number) => {
    const response = await fetchQuizDetail(quizId);
    return response.data;
  }
);

export const fetchQuestionsAsync = createAsyncThunk(
  "lesson/fetchQuestions",
  async (quizId: number) => {
    const response = await fetchQuestions(quizId);
    return response.data;
  }
);

export const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizDetailAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuizDetailAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.quiz = action.payload;
      })
      .addCase(fetchQuizDetailAsync.rejected, (state, action) => {
        state.status = "failed";
        state.errCode = action.error.message;
      })
      .addCase(fetchQuestionsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestionsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.questions = action.payload;
      })
      .addCase(fetchQuestionsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.errCode = action.error.message;
      });
  },
});

export const selectLesson = (state: RootState) => state.lesson;

export default lessonSlice.reducer;
