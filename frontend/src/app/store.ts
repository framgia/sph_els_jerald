import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import quizReducer from "../features/Categories/categoriesSlice";
import lessonReducer from "../features/StartLesson/lessonSlice";
import adminQuizReducer from "../features/AdminCategories/adminCategoriesSlice";
import adminQuizQuestionsReducer from "../features/AdminCategories/adminCategoriesWordsSlice";
import profileReducer from "../features/Profile/profileSlice";

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    lesson: lessonReducer,
    adminQuiz: adminQuizReducer,
    adminQuizQuestions: adminQuizQuestionsReducer,
    profile: profileReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
