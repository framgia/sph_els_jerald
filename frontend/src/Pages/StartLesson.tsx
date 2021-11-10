import { Fragment } from "react";

import classes from "./StartLesson.module.css";

const Lesson = () => {
  return (
    <Fragment>
      <div className="ui container segment">
        <div className="ui grid">
          <div className="eight wide column centered">
            <h2>Basic 500</h2>
            <h1>Home</h1>
          </div>
          <div className="eight wide column centered">
            <h2>1 out of 4</h2>
            <div className={classes.choices}>
              <button className="ui button primary">Balay</button>
            </div>
            <div className={classes.choices}>
              <button className="ui button primary">Lingkuranan</button>
            </div>
            <div className={classes.choices}>
              <button className="ui button primary">Lamesa</button>
            </div>
            <div className={classes.choices}>
              <button className="ui button primary">Tindahan</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Lesson;
