import { Fragment } from "react";

import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";

const Layout: React.FC = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
      <footer className={classes.footer}>
        <div>E-learning System 2021. All Rights Reserved</div>
      </footer>
    </Fragment>
  );
};

export default Layout;
