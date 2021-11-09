import { Fragment } from "react";
import StartLesson from "./components/StartLesson/StartLessonList";

const Lesson = () => {
  return (
    <Fragment>
      <form>
        <div className="ui three column stackable grid">
          <StartLesson />
        </div>
      </form>
    </Fragment>
  );
};

export default Lesson;
