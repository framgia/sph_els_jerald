import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchQuizDetail, fetchQuestions } from "./lessonAPI";
import { Quiz, QuizInitial } from "../../Types/Quiz";
import { Question, QuestionInitial } from "../../Types/Question";

export interface LessonState {
  quiz: Quiz;
  questions: Question[];
  status: "idle" | "loading" | "failed";
  errCode?: number;
}

const initialState: LessonState = {
  quiz: QuizInitial,
  questions: [QuestionInitial],
  status: "idle",
};

export const fetchQuizDetailAsync = createAsyncThunk(
  "lesson/fetchQuizDetail",
  async (quizId: number, { rejectWithValue }) => {
    try {
      const response = await fetchQuizDetail(quizId);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.status);
    }
  }
);

export const fetchQuestionsAsync = createAsyncThunk(
  "lesson/fetchQuestions",
  async (quizId: number, { rejectWithValue }) => {
    try {
      const response = await fetchQuestions(quizId);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.status);
    }
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
        state.errCode = Number(action.payload);
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
        state.errCode = Number(action.payload);
      });
  },
});

export const selectLesson = (state: RootState) => state.lesson;

export default lessonSlice.reducer;
