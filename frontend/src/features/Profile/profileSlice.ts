import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchSelfProfile } from "./profileAPI";

import { Activity } from "../../Types/Activity";

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

export interface ProfileState {
  details: {
    user: User;
    count_total_learned_words: number;
    count_total_learned_lessons: number;
    count_total_followers: number;
    count_total_following: number;
    activities: Activity[];
  };
  status: "idle" | "loading" | "failed";
}

const initialState: ProfileState = {
  details: {
    user: UserInitial,
    count_total_learned_words: 0,
    count_total_learned_lessons: 0,
    count_total_followers: 0,
    count_total_following: 0,
    activities: [],
  },
  status: "idle",
};

export const fetchSelfProfileAsync = createAsyncThunk(
  "quizzes/fetchSelfProfile",
  async () => {
    const response = await fetchSelfProfile();
    return response.data;
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSelfProfileAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSelfProfileAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.details = action.payload;
      });
  },
});

export const selectProfile = (state: RootState) => state.profile;

export default profileSlice.reducer;
