import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchLearnedLessonResult } from "./learnedLessonResultAPI";

type User = {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  email_verified_at: string;
  isAdmin: number;
  avatar: string;
  created_at: string;
  updated_at: string;
};

const UserInitial = {
  id: 0,
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  email_verified_at: "",
  isAdmin: 0,
  avatar: "",
  created_at: "",
  updated_at: "",
};

export interface LearnedLessonResultState {
  details: {
    user: User;
    quiz: { id: number; title: string; description: string };
    count_total_learned_lessons: number;
    correct_answers: number;
    total_answers: number;
    results: { word: string; answer: string; isCorrect: boolean }[];
  };
  status: "idle" | "loading" | "failed";
}

const initialState: LearnedLessonResultState = {
  details: {
    user: UserInitial,
    quiz: { id: 0, title: "", description: "" },
    count_total_learned_lessons: 0,
    correct_answers: 0,
    total_answers: 0,
    results: [],
  },
  status: "idle",
};

export const fetchLearnedLessonResultAsync = createAsyncThunk(
  "quizzes/fetchLearnedLessonResult",
  async (quizId: number) => {
    const response = await fetchLearnedLessonResult(quizId);
    return response.data;
  }
);

export const getLearnedLessonResultSlice = createSlice({
  name: "getLearnedLessonResult",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLearnedLessonResultAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLearnedLessonResultAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.details = action.payload;
      });
  },
});

export const selectLearnedLessonResult = (state: RootState) =>
  state.getLearnedLessonResult;

export default getLearnedLessonResultSlice.reducer;
