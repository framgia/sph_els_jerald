import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import quizReducer from "../features/Categories/categoriesSlice";
import lessonReducer from "../features/StartLesson/lessonSlice";

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    lesson: lessonReducer,
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
