import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchSelfDashboard } from "./dashboardAPI";

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

export interface DashboardState {
  details: {
    user: User;
    count_total_learned_words: number;
    count_total_learned_lessons: number;
    activities: Activity[];
  };
  status: "idle" | "loading" | "failed";
}

const initialState: DashboardState = {
  details: {
    user: UserInitial,
    count_total_learned_words: 0,
    count_total_learned_lessons: 0,
    activities: [],
  },
  status: "idle",
};

export const fetchSelfDashboardAsync = createAsyncThunk(
  "quizzes/fetchSelfDashboard",
  async () => {
    const response = await fetchSelfDashboard();
    return response.data;
  }
);

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSelfDashboardAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSelfDashboardAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.details = action.payload;
      });
  },
});

export const selectDashboard = (state: RootState) => state.dashboard;

export default dashboardSlice.reducer;
