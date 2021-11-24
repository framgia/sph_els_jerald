import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchLearnedLessons } from "./learnedLessonsAPI";

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

export interface LearnedLessonsState {
  details: {
    user: User;
    count_total_learned_lessons: number;
    learned_lessons: { id: number; title: string; description: string }[];
  };
  status: "idle" | "loading" | "failed";
}

const initialState: LearnedLessonsState = {
  details: {
    user: UserInitial,
    count_total_learned_lessons: 0,
    learned_lessons: [],
  },
  status: "idle",
};

export const fetchLearnedLessonsAsync = createAsyncThunk(
  "quizzes/fetchLearnedLessons",
  async () => {
    const response = await fetchLearnedLessons();
    return response.data;
  }
);

export const getLearnedLessonsSlice = createSlice({
  name: "getLearnedLessons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLearnedLessonsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLearnedLessonsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.details = action.payload;
      });
  },
});

export const selectLearnedLessons = (state: RootState) =>
  state.getLearnedLessons;

export default getLearnedLessonsSlice.reducer;
