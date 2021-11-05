import { Fragment } from "react";
import { Link } from "react-router-dom";

import classes from "./DashboardActivitiesList.module.css";

const DashboardActivitiesList = () => {
  return (
    <Fragment>
      <div className={classes.activities}>
        <img
          src="https://www.vhv.rs/dpng/d/256-2569650_men-profile-icon-png-image-free-download-searchpng.png"
          alt="profile pic"
          height="80"
          width="80"
        />
        <div>
          <h3>
            <Link to="/">You</Link> learned 20 of 20 words in{" "}
            <Link to="/">Basic 500</Link>
          </h3>
          <h5>2 days ago</h5>
        </div>
      </div>
      <div className={classes.activities}>
        <img
          src="https://www.vhv.rs/dpng/d/256-2569650_men-profile-icon-png-image-free-download-searchpng.png"
          alt="profile pic"
          height="80"
          width="80"
        />
        <div>
          <h3>
            <Link to="/">You</Link> learned 20 of 20 words in{" "}
            <Link to="/">Basic 500</Link>
          </h3>
          <h5>2 days ago</h5>
        </div>
      </div>
      <div className={classes.activities}>
        <img
          src="https://www.vhv.rs/dpng/d/256-2569650_men-profile-icon-png-image-free-download-searchpng.png"
          alt="profile pic"
          height="80"
          width="80"
        />
        <div>
          <h3>
            <Link to="/">You</Link> learned 20 of 20 words in{" "}
            <Link to="/">Basic 500</Link>
          </h3>
          <h5>2 days ago</h5>
        </div>
      </div>
      <div className={classes.activities}>
        <img
          src="https://www.vhv.rs/dpng/d/256-2569650_men-profile-icon-png-image-free-download-searchpng.png"
          alt="profile pic"
          height="80"
          width="80"
        />
        <div>
          <h3>
            <Link to="/">You</Link> followed <Link to="/">James</Link>
          </h3>
          <h5>2 days ago</h5>
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardActivitiesList;
