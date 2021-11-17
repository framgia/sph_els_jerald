import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/userAuth";
import Layout from "../UI/Layout";

const AuthRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated() ? (
          <Redirect to="/dashboard" />
        ) : (
          <Fragment>
            <Layout>
              <Component {...rest} />
            </Layout>
          </Fragment>
        )
      }
    />
  );
};

export default AuthRoute;
