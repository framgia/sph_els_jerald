import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchQuiz } from "./categoriesAPI";

export interface QuizState {
  quizzes: {
    id: number;
    title: string;
    description: string;
    already_taken: string;
  }[];
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
