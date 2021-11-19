import { Switch } from "react-router-dom";

// Pages
import Dashboard from "./Pages/Dashboard";
import Categories from "./Pages/Categories";
import NotFound from "./Pages/NotFound";
import StartLesson from "./Pages/StartLesson";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import AddCategory from "./Pages/components/AdminCategories/AddCategory";
import EditCategory from "./Pages/components/AdminCategories/EditCategory";
import AdminCategories from "./Pages/AdminCategories";
import AdminCategoriesWords from "./Pages/components/AdminCategories/AdminCategoriesWords";
import AddCategoryWords from "./Pages/components/AdminCategories/AddCategoryWords";
import EditCategoryWords from "./Pages/components/AdminCategories/EditCategoryWords";
import AdminSignIn from "./Pages/AdminSignIn";
import Profile from "./Pages/Profile";

// Routes
import UserRoute from "./Routes/UserRoute";
import AuthRoute from "./Routes/AuthRoute";
import AdminRoute from "./Routes/AdminRoute";
import AdminAuthRoute from "./Routes/AdminAuthRoute";

function App() {
  return (
    <Switch>
      <AuthRoute exact path="/" component={SignIn} />
      <AuthRoute exact path="/signup" component={SignUp} />
      <UserRoute exact path="/dashboard" component={Dashboard} />
      <UserRoute exact path="/categories" component={Categories} />
      <UserRoute exact path="/categories/:quizId" component={StartLesson} />
      <UserRoute exact path="/profile" component={Profile} />
      <AdminAuthRoute exact path="/admin" component={AdminSignIn} />
      <AdminRoute exact path="/admin/categories" component={AdminCategories} />
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
      <UserRoute path="*" component={NotFound} />
    </Switch>
  );
}

export default App;
