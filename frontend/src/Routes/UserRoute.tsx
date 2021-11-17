import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/userAuth";
import Layout from "../UI/Layout";

const UserRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Fragment>
            <Layout>
              <Component {...props} />
            </Layout>
          </Fragment>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default UserRoute;
