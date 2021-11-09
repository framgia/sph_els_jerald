import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  selectQuizzes,
  fetchQuizAsync,
} from "../../../features/Categories/categoriesSlice";
import { Quiz } from "../../../Types/Quiz";

const CategoriesList = () => {
  const data = useAppSelector(selectQuizzes);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchQuizAsync());
  }, [dispatch]);

  return (
    <Fragment>
      {data.status === "loading" && (
        <div className="ui active dimmer">
          <div className="ui loader"></div>
        </div>
      )}

      {data.quizzes &&
        data.status === "idle" &&
        data.quizzes.map((item: Quiz) => (
          <div className="column" key={item.id}>
            <div className="ui segment raised very padded">
              <h2 className="ui header">{item.title}</h2>
              <p>{item.description}</p>
              <Link to={`/categories/${item.id}`} className="ui primary button">
                Start Lesson
              </Link>
            </div>
          </div>
        ))}

      {data.status === "idle" && !data.quizzes && (
        <h2 className="ui message">No categories found</h2>
      )}
    </Fragment>
  );
};

export default CategoriesList;
