import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchQuiz } from "./categoriesAPI";
import { Quiz } from "../../Types/Quiz";

export interface QuizState {
  quizzes: Quiz[];
  status: "idle" | "loading" | "failed";
}

const initialState: QuizState = {
  quizzes: [],
  status: "idle",
};

export const fetchQuizAsync = createAsyncThunk(
  "quizzes/fetchQuiz",
  async () => {
    const response = await fetchQuiz();
    return response.data;
  }
);

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuizAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.quizzes = action.payload;
      });
  },
});

export const selectQuizzes = (state: RootState) => state.quiz;

export default quizSlice.reducer;
