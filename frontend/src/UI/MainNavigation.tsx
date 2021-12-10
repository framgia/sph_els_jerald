import { useHistory, NavLink } from "react-router-dom";
import { signOutUser } from "../features/SignOut/signOutAPI";
import CookieService from "../Services/CookieService";
import { useState } from "react";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const history = useHistory();
  const [isLogoutLoading, setLogoutIsLoading] = useState(false);
  const onLogoutHandler = async () => {
    setLogoutIsLoading(true);
    await signOutUser();
    setLogoutIsLoading(false);
    CookieService.remove("token");
    history.push("/");
  };

  return (
    <header className={classes.header}>
      <div className="ui secondary stackable menu">
        <h2 className="item">E-learning System</h2>

        <NavLink to="/dashboard" className="item" activeClassName="active">
          Dashboard
        </NavLink>
        <NavLink to="/categories" className="item" activeClassName="active">
          Categories
        </NavLink>
        <NavLink to="/users" className="item" activeClassName="active">
          Users
        </NavLink>

        <div className="right item menu">
          <NavLink to="/profile" className="item" activeClassName="active">
            Profile
          </NavLink>
          <div
            className={`${isLogoutLoading ? "item" : "link item"}`}
            onClick={onLogoutHandler}
          >
            {isLogoutLoading ? (
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

export default MainNavigation;
