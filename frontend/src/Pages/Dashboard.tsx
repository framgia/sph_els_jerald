import { Fragment } from "react";

import classes from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <Fragment>
      <div className="ui grid stackable">
        <div className="four wide column">
          <h2>Dashboard Page</h2>
          <div className={classes.side}>
            <img
              src="https://www.vhv.rs/dpng/d/256-2569650_men-profile-icon-png-image-free-download-searchpng.png"
              alt="profile pic"
              height="150"
              width="150"
            />
            <div>
              <h3>John Doe</h3>
              <h4>Learned 20 words</h4>
              <h4>Learned 5 lessons</h4>
            </div>
          </div>
        </div>
        <div className="twelve wide column ui container segment">
          <h2>Activities</h2>
          <div className={classes.activities}>
            <img
              src="https://www.vhv.rs/dpng/d/256-2569650_men-profile-icon-png-image-free-download-searchpng.png"
              alt="profile pic"
              height="80"
              width="80"
            />
            <div>
              <h3>You learned 20 of 20 words in Basic 500</h3>
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
              <h3>You learned 20 of 20 words in Basic 500</h3>
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
              <h3>You learned 20 of 20 words in Basic 500</h3>
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
              <h3>You learned 20 of 20 words in Basic 500</h3>
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
              <h3>You followed James</h3>
              <h5>2 days ago</h5>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
