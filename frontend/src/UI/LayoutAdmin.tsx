import { Fragment } from "react";

import classes from "./LayoutAdmin.module.css";
import MainNavigationAdmin from "./MainNavigationAdmin";

const LayoutAdmin: React.FC = (props) => {
  return (
    <Fragment>
      <MainNavigationAdmin />
      <main className={classes.main}>{props.children}</main>
      <footer className={classes.footer}>
        <div>E-learning System 2021. All Rights Reserved</div>
      </footer>
    </Fragment>
  );
};

export default LayoutAdmin;
