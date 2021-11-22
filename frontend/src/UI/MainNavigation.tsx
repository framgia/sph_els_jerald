import { useHistory, NavLink } from "react-router-dom";
import { signOutUser } from "../features/SignOut/signOutAPI";
import CookieService from "../Services/CookieService";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const history = useHistory();
  const onLogoutHandler = async () => {
    await signOutUser();
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

        <div className="right item menu">
          <NavLink to="/profile" className="item" activeClassName="active">
            Profile
          </NavLink>
          <div className="link item" onClick={onLogoutHandler}>
            Logout
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainNavigation;
