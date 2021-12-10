import { useHistory, NavLink } from "react-router-dom";
import { signOutAdmin } from "../features/AdminSignOut/adminSignOutAPI";
import CookieService from "../Services/CookieService";
import { useState } from "react";

import classes from "./MainNavigationAdmin.module.css";

const MainNavigationAdmin = () => {
  const history = useHistory();
  const [isLogoutAdminLoading, setLogoutAdminIsLoading] = useState(false);
  const onLogoutHandlerAdmin = async () => {
    setLogoutAdminIsLoading(true);
    await signOutAdmin();
    setLogoutAdminIsLoading(false);
    CookieService.remove("adminToken");
    history.push("/admin");
  };

  return (
    <header className={classes.header}>
      <div className="ui secondary stackable menu">
        <h2 className="item">
          E-learning System <div className="ui red horizontal label">Admin</div>
        </h2>

        <NavLink
          to="/admin/categories"
          className="item"
          activeClassName="active"
        >
          Categories
        </NavLink>

        <NavLink to="/admin/users" className="item" activeClassName="active">
          Users
        </NavLink>

        <div className="right menu">
          <div
            className={`${isLogoutAdminLoading ? "item" : "link item"}`}
            onClick={onLogoutHandlerAdmin}
          >
            {isLogoutAdminLoading ? (
              <div className="ui tiny active inline loader"></div>
            ) : (
              "Sign out"
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainNavigationAdmin;
