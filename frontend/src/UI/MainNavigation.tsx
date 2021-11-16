// import { NavLink } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { signOutUser } from "../features/SignOut/signOutAPI";
import CookieService from "../Services/CookieService";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const onLogoutHandler = async () => {
    CookieService.remove("token");
    await signOutUser();
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

        <NavLink
          to="/admin/categories"
          className="item"
          activeClassName="active"
        >
          Categories
        </NavLink>

        <div className="right menu">
          <Link to="/signin" className="item" onClick={onLogoutHandler}>
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
};

export default MainNavigation;
