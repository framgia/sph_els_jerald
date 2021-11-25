import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import quizReducer from "../features/Categories/categoriesSlice";
import lessonReducer from "../features/StartLesson/lessonSlice";
import adminQuizReducer from "../features/AdminCategories/adminCategoriesSlice";
import adminQuizQuestionsReducer from "../features/AdminCategories/adminCategoriesWordsSlice";
import profileReducer from "../features/Profile/profileSlice";
import adminUsersReducer from "../features/AdminUsers/adminUsersSlice";
import dashboardReducer from "../features/Dashboard/dashboardSlice";
import getProfileReducer from "../features/GetProfile/getProfileSlice";
import getLearnedWordsReducer from "../features/LearnedWords/learnedWordsSlice";
import getLearnedLessonsReducer from "../features/LearnedLessons/learnedLessonsSlice";
import getLearnedLessonResultReducer from "../features/LearnedLessonResult/learnedLessonResultSlice";

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    lesson: lessonReducer,
    adminQuiz: adminQuizReducer,
    adminQuizQuestions: adminQuizQuestionsReducer,
    profile: profileReducer,
    adminUsers: adminUsersReducer,
    dashboard: dashboardReducer,
    getProfile: getProfileReducer,
    getLearnedWords: getLearnedWordsReducer,
    getLearnedLessons: getLearnedLessonsReducer,
    getLearnedLessonResult: getLearnedLessonResultReducer,
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
