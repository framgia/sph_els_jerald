import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchLearnedWords } from "./learnedWordsAPI";

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

export interface LearnedWordsState {
  details: {
    user: User;
    count_total_learned_words: number;
    learned_words: { word: string; answer: string; isCorrect: boolean }[];
  };
  status: "idle" | "loading" | "failed";
}

const initialState: LearnedWordsState = {
  details: {
    user: UserInitial,
    count_total_learned_words: 0,
    learned_words: [],
  },
  status: "idle",
};

export const fetchLearnedWordsAsync = createAsyncThunk(
  "quizzes/fetchLearnedWords",
  async (userId: number) => {
    const response = await fetchLearnedWords(userId);
    return response.data;
  }
);

export const getLearnedWordsSlice = createSlice({
  name: "getLearnedWords",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLearnedWordsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLearnedWordsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.details = action.payload;
      });
  },
});

export const selectLearnedWords = (state: RootState) => state.getLearnedWords;

export default getLearnedWordsSlice.reducer;
