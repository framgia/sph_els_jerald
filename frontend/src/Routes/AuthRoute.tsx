import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/userAuth";

const AuthRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated() ? (
          <Redirect to="/dashboard" />
        ) : (
          <Fragment>
            <Component {...rest} />
          </Fragment>
        )
      }
    />
  );
};

export default AuthRoute;
