import { NavLink } from "react-router-dom";
import { signOutUser } from "../features/SignOut/signOutAPI";
import CookieService from "../Services/CookieService";

import classes from "./MainNavigation.module.css";

const MainNavigationAdmin = () => {
  const onLogoutHandler = async () => {
    await signOutUser();
    CookieService.remove("token");
  };

  return (
    <header className={classes.header}>
      <div className="ui secondary stackable menu">
        <h2 className="item">E-learning System</h2>

        <NavLink
          to="/admin/categories"
          className="item"
          activeClassName="active"
        >
          Categories
        </NavLink>

        <div className="right menu">
          <div className="link item" onClick={onLogoutHandler}>
            Logout
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainNavigationAdmin;
