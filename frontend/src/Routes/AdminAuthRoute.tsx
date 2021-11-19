import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAdminAuthenticated } from "../auth/adminAuth";

const AdminAuthRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        isAdminAuthenticated() ? (
          <Redirect to="/admin/categories" />
        ) : (
          <Fragment>
            <Component {...rest} />
          </Fragment>
        )
      }
    />
  );
};

export default AdminAuthRoute;
