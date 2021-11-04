// import { NavLink } from "react-router-dom";
import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <div className="ui secondary menu">
        <h2 className="item">E-learning System</h2>

        <NavLink to="/dashboard" className="item" activeClassName="active">
          Dashboard
        </NavLink>
        <NavLink to="/categories" className="item" activeClassName="active">
          Categories
        </NavLink>

        <div className="right menu">
          <a className="ui item" href="/">
            Logout
          </a>
        </div>
      </div>
    </header>
  );
};

export default MainNavigation;
