import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchUsers } from "./usersAPI";

export interface UsersState {
  users: {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    avatar: string;
    isFollowed: boolean;
  }[];
  status: "idle" | "loading" | "failed";
}

const initialState: UsersState = {
  users: [],
  status: "idle",
};

export const fetchUsersAsync = createAsyncThunk(
  "quizzes/fetchUsers",
  async () => {
    const response = await fetchUsers();
    return response.data;
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = action.payload;
      });
  },
});

export const selectUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
