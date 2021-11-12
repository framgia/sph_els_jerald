import { Fragment } from "react";

import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";

const Layout: React.FC = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
      <footer>
        <div className="ui centered vertical footer segment form-page">
          <div className="ui container">
            E-learning System 2021. All Rights Reserved
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Layout;
