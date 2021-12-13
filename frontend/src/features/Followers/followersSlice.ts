import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchFollowers } from "./followersAPI";

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

export interface FollowersState {
  details: {
    user: User;
    count_total_followers: number;
    count_total_following: number;
    followers: {
      id: number;
      firstName: string;
      middleName: string;
      lastName: string;
      avatar: string;
    }[];
  };
  status: "idle" | "loading" | "failed";
  error?: number;
}

const initialState: FollowersState = {
  details: {
    user: UserInitial,
    count_total_followers: 0,
    count_total_following: 0,
    followers: [],
  },
  status: "idle",
};

export const fetchFollowersAsync = createAsyncThunk(
  "quizzes/fetchFollowers",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await fetchFollowers(userId);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.status);
    }
  }
);

export const followersSlice = createSlice({
  name: "followers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFollowersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFollowersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.details = action.payload;
      })
      .addCase(fetchFollowersAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = Number(action.payload);
      });
  },
});

export const selectFollowers = (state: RootState) => state.followers;

export default followersSlice.reducer;
