import { Route, Switch, Redirect } from "react-router-dom";

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

// Routes
import UserRoute from "./Routes/UserRoute";
import AuthRoute from "./Routes/AuthRoute";

function App() {
  return (
    <Switch>
      <AuthRoute exact path="/" component={SignIn} />
      <AuthRoute exact path="/signup" component={SignUp} />
      <UserRoute exact path="/dashboard" component={Dashboard} />
      <UserRoute exact path="/categories" component={Categories} />
      <UserRoute exact path="/categories/:quizId" component={StartLesson} />
      <Route path="/admin" exact>
        <Redirect to="/admin/categories" />
      </Route>
      <Route exact path="/admin/categories">
        <AdminCategories />
      </Route>
      <Route exact path="/admin/categories/:quizId">
        <AdminCategoriesWords />
      </Route>
      <Route exact path="/admin/categories/:quizId/words">
        <AddCategoryWords />
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
