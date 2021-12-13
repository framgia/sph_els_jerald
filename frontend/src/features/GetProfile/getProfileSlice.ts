import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchGetProfile } from "./getProfileAPI";

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

export interface GetProfileState {
  details: {
    isFollowed: boolean;
    signed_in_user: number;
    user: User;
    count_total_learned_words: number;
    count_total_learned_lessons: number;
    count_total_followers: number;
    count_total_following: number;
    activities: Activity[];
  };
  status: "idle" | "loading" | "failed";
  error?: number;
}

const initialState: GetProfileState = {
  details: {
    isFollowed: false,
    signed_in_user: 0,
    user: UserInitial,
    count_total_learned_words: 0,
    count_total_learned_lessons: 0,
    count_total_followers: 0,
    count_total_following: 0,
    activities: [],
  },
  status: "idle",
};

export const fetchGetProfileAsync = createAsyncThunk(
  "quizzes/fetchGetProfile",
  async (userId: number, { rejectWithValue }) => {
    // const response = await fetchGetProfile(userId);
    // return response.data;

    try {
      const response = await fetchGetProfile(userId);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.status);
    }
  }
);

export const getProfileSlice = createSlice({
  name: "getProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetProfileAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGetProfileAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.details = action.payload;
      })
      .addCase(fetchGetProfileAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = Number(action.payload);
      });
  },
});

export const selectGetProfile = (state: RootState) => state.getProfile;

export default getProfileSlice.reducer;
