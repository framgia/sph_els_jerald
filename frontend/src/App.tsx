import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// UI
import Layout from "./UI/Layout";

// Pages
import Dashboard from "./Pages/Dashboard";
import Categories from "./Pages/Categories";
import NotFound from "./Pages/NotFound";
import StartLesson from "./Pages/StartLesson";
import AdminCategories from "./Pages/AdminCategories";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import AddCategory from "./Pages/components/AdminCategories/AddCategory";
import EditCategory from "./Pages/components/AdminCategories/EditCategory";

function App() {
  return (
    <Fragment>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/dashboard" />
          </Route>
          <Route path="/dashboard" exact>
            <Dashboard />
          </Route>
          <Route path="/categories" exact>
            <Categories />
          </Route>
          <Route path="/categories/:quizId" exact>
            <StartLesson />
          </Route>
          <Route path="/admin" exact>
            <Redirect to="/admin/categories" />
          </Route>
          <Route path="/admin/categories">
            <AdminCategories />
          </Route>
          <Route path="/admin/add-category">
            <AddCategory />
          </Route>
          <Route path="/admin/edit-category/:quizId">
            <EditCategory />
          </Route>
          <Route path="/signup" exact>
            <SignUp />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </Fragment>
  );
}

export default App;
