import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchAdminQuizQuestions } from "./adminCategoriesWordsAPI";

type Question = {
  id: number;
  quiz_id: number;
  word: string;
};

export interface AdminQuizQuestionsState {
  quizzes: {
    current_page: number;
    data: Question[];
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

const initialState: AdminQuizQuestionsState = {
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

export const fetchAdminQuizQuestionsAsync = createAsyncThunk(
  "quizzes/fetchAdminQuizQuestions",
  async (data: { quizId: number; page: number }) => {
    const response = await fetchAdminQuizQuestions(data.quizId, data.page);
    return response.data;
  }
);

export const adminQuizQuestionsSlice = createSlice({
  name: "adminQuizQuestions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminQuizQuestionsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdminQuizQuestionsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.quizzes = action.payload;
      });
  },
});

export const selectAdminQuizQuestions = (state: RootState) =>
  state.adminQuizQuestions;

export default adminQuizQuestionsSlice.reducer;
