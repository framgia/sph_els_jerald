import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAdminAuthenticated } from "../auth/adminAuth";
import LayoutAdmin from "../UI/LayoutAdmin";

const AdminRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAdminAuthenticated() ? (
          <Fragment>
            <LayoutAdmin>
              <Component {...props} />
            </LayoutAdmin>
          </Fragment>
        ) : (
          <Redirect to="/admin" />
        )
      }
    />
  );
};

export default AdminRoute;
