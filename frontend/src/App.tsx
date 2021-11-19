import { Route, Switch } from "react-router-dom";

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
      <AdminAuthRoute exact path="/admin" component={AdminSignIn} />
      <AdminRoute exact path="/admin/categories" component={AdminCategories} />
      <Route exact path="/admin/categories/:quizId">
        <AdminCategoriesWords />
      </Route>
      <Route exact path="/admin/categories/:quizId/words">
        <AddCategoryWords />
      </Route>
      <Route exact path="/admin/categories/:quizId/words/:questionId">
        <EditCategoryWords />
      </Route>
      <Route path="/admin/add-category">
        <AddCategory />
      </Route>
      <Route path="/admin/edit-category/:quizId">
        <EditCategory />
      </Route>
      <UserRoute path="*" component={NotFound} />
    </Switch>
  );
}

export default App;
