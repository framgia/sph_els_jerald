import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import quizReducer from "../features/Categories/categoriesSlice";
import lessonReducer from "../features/StartLesson/lessonSlice";
import adminQuizReducer from "../features/AdminCategories/adminCategoriesSlice";
import adminQuizQuestionsReducer from "../features/AdminCategories/adminCategoriesWordsSlice";

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    lesson: lessonReducer,
    adminQuiz: adminQuizReducer,
    adminQuizQuestions: adminQuizQuestionsReducer,
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
