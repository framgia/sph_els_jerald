import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchAdminUsers } from "./adminUsersAPI";

export interface AdminUsersState {
  users: {
    current_page: number;
    data: {
      id: number;
      firstName: string;
      middleName: string;
      lastName: string;
      email: string;
      email_verified_at: Date;
      isAdmin: number;
      avatar: string;
      created_at: Date;
      updated_at: Date;
    }[];
    first_page_url: string;
    from: number;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
  };
  status: "idle" | "loading" | "failed";
}

const initialState: AdminUsersState = {
  users: {
    current_page: 0,
    data: [],
    first_page_url: "",
    from: 0,
    next_page_url: "",
    path: "",
    per_page: 0,
    prev_page_url: "",
    to: 0,
  },
  status: "idle",
};

export const fetchAdminUsersAsync = createAsyncThunk(
  "quizzes/fetchAdminUsers",
  async (page: number) => {
    const response = await fetchAdminUsers(page);
    return response.data;
  }
);

export const adminUsersSlice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminUsersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdminUsersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = action.payload;
      });
  },
});

export const selectAdminUsers = (state: RootState) => state.adminUsers;

export default adminUsersSlice.reducer;
