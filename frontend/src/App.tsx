import { Switch } from "react-router-dom";
import React, { Suspense } from "react";

// Pages
const Dashboard = React.lazy(() => import("./Pages/Dashboard"));
const Categories = React.lazy(() => import("./Pages/Categories"));
const NotFound = React.lazy(() => import("./Pages/NotFound"));
const StartLesson = React.lazy(() => import("./Pages/StartLesson"));
const SignUp = React.lazy(() => import("./Pages/SignUp"));
const SignIn = React.lazy(() => import("./Pages/SignIn"));
const AddCategory = React.lazy(
  () => import("./Pages/components/AdminCategories/AddCategory")
);
const EditCategory = React.lazy(
  () => import("./Pages/components/AdminCategories/EditCategory")
);
const AdminCategories = React.lazy(() => import("./Pages/AdminCategories"));
const AdminCategoriesWords = React.lazy(
  () => import("./Pages/components/AdminCategories/AdminCategoriesWords")
);
const AddCategoryWords = React.lazy(
  () => import("./Pages/components/AdminCategories/AddCategoryWords")
);
const EditCategoryWords = React.lazy(
  () => import("./Pages/components/AdminCategories/EditCategoryWords")
);
const AdminSignIn = React.lazy(() => import("./Pages/AdminSignIn"));
const Profile = React.lazy(() => import("./Pages/Profile"));
const AdminUsers = React.lazy(() => import("./Pages/AdminUsers"));
const GetProfile = React.lazy(() => import("./Pages/GetProfile"));
const LearnedWords = React.lazy(() => import("./Pages/LearnedWords"));
const LearnedLessons = React.lazy(() => import("./Pages/LearnedLessons"));
const LearnedLessonResult = React.lazy(
  () => import("./Pages/LearnedLessonResult")
);
const Users = React.lazy(() => import("./Pages/Users"));
const EditProfile = React.lazy(() => import("./Pages/EditProfile"));
const Following = React.lazy(() => import("./Pages/Following"));
const Followers = React.lazy(() => import("./Pages/Followers"));

// Routes
const UserRoute = React.lazy(() => import("./Routes/UserRoute"));
const AuthRoute = React.lazy(() => import("./Routes/AuthRoute"));
const AdminRoute = React.lazy(() => import("./Routes/AdminRoute"));
const AdminAuthRoute = React.lazy(() => import("./Routes/AdminAuthRoute"));

function App() {
  return (
    <Suspense
      fallback={<div className="ui active centered inline loader"></div>}
    >
      <Switch>
        <AuthRoute exact path="/" component={SignIn} />
        <AuthRoute exact path="/signup" component={SignUp} />
        <UserRoute exact path="/dashboard" component={Dashboard} />
        <UserRoute exact path="/categories" component={Categories} />
        <UserRoute exact path="/categories/:quizId" component={StartLesson} />
        <UserRoute exact path="/profile" component={Profile} />
        <UserRoute exact path="/show-profile/:userId" component={GetProfile} />
        <UserRoute exact path="/learned-words" component={LearnedWords} />
        <UserRoute exact path="/learned-lessons" component={LearnedLessons} />
        <UserRoute exact path="/users" component={Users} />
        <UserRoute
          exact
          path="/learned-lesson/result/:quizId"
          component={LearnedLessonResult}
        />
        <UserRoute exact path="/edit-profile" component={EditProfile} />
        <UserRoute exact path="/following/:userId" component={Following} />
        <UserRoute exact path="/followers/:userId" component={Followers} />
        <AdminAuthRoute exact path="/admin" component={AdminSignIn} />
        <AdminRoute
          exact
          path="/admin/categories"
          component={AdminCategories}
        />
        <AdminRoute
          exact
          path="/admin/categories/:quizId"
          component={AdminCategoriesWords}
        />
        <AdminRoute
          exact
          path="/admin/categories/:quizId/words"
          component={AddCategoryWords}
        />
        <AdminRoute
          exact
          path="/admin/categories/:quizId/words/:questionId"
          component={EditCategoryWords}
        />
        <AdminRoute exact path="/admin/add-category" component={AddCategory} />
        <AdminRoute
          exact
          path="/admin/edit-category/:quizId"
          component={EditCategory}
        />
        <AdminRoute exact path="/admin/users" component={AdminUsers} />
        <UserRoute path="*" component={NotFound} />
      </Switch>
    </Suspense>
  );
}

export default App;
