import { useHistory, NavLink } from "react-router-dom";
import { signOutAdmin } from "../features/AdminSignOut/adminSignOutAPI";
import CookieService from "../Services/CookieService";

import classes from "./MainNavigationAdmin.module.css";

const MainNavigationAdmin = () => {
  const history = useHistory();
  const onLogoutHandler = async () => {
    await signOutAdmin();
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
