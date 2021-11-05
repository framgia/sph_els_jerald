import { Link } from "react-router-dom";
import classes from "./DashboardSide.module.css";

const DashboardSide = () => {
  return (
    <div className={classes.side}>
      <img
        src="https://www.vhv.rs/dpng/d/256-2569650_men-profile-icon-png-image-free-download-searchpng.png"
        alt="profile pic"
        height="150"
        width="150"
      />
      <div>
        <h3>
          <Link to="/">John Doe</Link>
        </h3>
        <h4>
          <Link to="/">Learned 20 words</Link>
        </h4>
        <h4>
          <Link to="/">Learned 5 lessons</Link>
        </h4>
      </div>
    </div>
  );
};

export default DashboardSide;
