import { Fragment } from "react";

import DashboardActivitiesList from "./components/Dashboard/DashboardActivitiesList";
import DashboardSide from "./components/Dashboard/DashboardSide";

const Dashboard = () => {
  return (
    <Fragment>
      <div className="ui grid stackable">
        <div className="four wide column">
          <h2>Dashboard</h2>
          <DashboardSide />
        </div>
        <div className="twelve wide column ui container segment raised">
          <h2>Activities</h2>
          <DashboardActivitiesList />
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
