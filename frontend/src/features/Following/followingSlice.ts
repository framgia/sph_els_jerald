import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchFollowing } from "./followingAPI";

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

export interface FollowingState {
  details: {
    user: User;
    count_total_followers: number;
    count_total_following: number;
    following: {
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

const initialState: FollowingState = {
  details: {
    user: UserInitial,
    count_total_followers: 0,
    count_total_following: 0,
    following: [],
  },
  status: "idle",
};

export const fetchFollowingAsync = createAsyncThunk(
  "quizzes/fetchFollowing",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await fetchFollowing(userId);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.status);
    }
  }
);

export const followingSlice = createSlice({
  name: "following",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFollowingAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFollowingAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.details = action.payload;
      })
      .addCase(fetchFollowingAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = Number(action.payload);
      });
  },
});

export const selectFollowing = (state: RootState) => state.following;

export default followingSlice.reducer;
