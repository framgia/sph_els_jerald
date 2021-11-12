import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchAdminQuizzes } from "./adminCategoriesAPI";
import { Quiz } from "../../Types/Quiz";

export interface AdminQuizState {
  quizzes: {
    current_page: number;
    data: Quiz[];
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

const initialState: AdminQuizState = {
  quizzes: {
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

export const fetchAdminQuizAsync = createAsyncThunk(
  "quizzes/fetchAdminQuizzes",
  async (page: number) => {
    const response = await fetchAdminQuizzes(page);
    return response.data;
  }
);

export const adminQuizSlice = createSlice({
  name: "adminQuiz",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminQuizAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdminQuizAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.quizzes = action.payload;
      });
  },
});

export const selectAdminQuizzes = (state: RootState) => state.adminQuiz;

export default adminQuizSlice.reducer;
