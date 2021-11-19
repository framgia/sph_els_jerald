import { Fragment } from "react";

import classes from "./LayoutAdmin.module.css";
import MainNavigationAdmin from "./MainNavigationAdmin";

const LayoutAdmin: React.FC = (props) => {
  return (
    <Fragment>
      <MainNavigationAdmin />
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

export default LayoutAdmin;
