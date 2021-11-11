import React, { Fragment } from "react";
// import { Counter } from './features/counter/Counter';

import { Route, Switch, Redirect } from "react-router-dom";

// UI
import Layout from "./UI/Layout";

// Pages
import Dashboard from "./Pages/Dashboard";
import Categories from "./Pages/Categories";
import NotFound from "./Pages/NotFound";
import StartLesson from "./Pages/StartLesson";
import AdminCategories from "./Pages/AdminCategories";

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
          <Route path="/categories/:quizId">
            <StartLesson />
          </Route>
          <Route path="/admin" exact>
            <Redirect to="/admin/categories" />
          </Route>
          <Route path="/admin/categories">
            <AdminCategories />
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
