import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  selectLearnedLessons,
  fetchLearnedLessonsAsync,
} from "../features/LearnedLessons/learnedLessonsSlice";

const LearnedLessons = () => {
  const data = useAppSelector(selectLearnedLessons);

  const fullName =
    data.details.user.firstName +
    " " +
    data.details.user.middleName.charAt(0) +
    " " +
    data.details.user.lastName;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLearnedLessonsAsync());
  }, [dispatch]);

  return (
    <Fragment>
      {data.status === "loading" && (
        <div className="ui active dimmer">
          <div className="ui loader"></div>
        </div>
      )}

      <div className="ui two column grid stackable">
        <div className="four wide computer column six wide tablet column">
          <div className="ui segment raised padded">
            <img
              className="ui small rounded image centered"
              src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
              alt="Profile Pic"
            />
            <h1 className="ui huge header centered">{fullName}</h1>
            <Link
              to={`/learned-lessons`}
              className="ui button basic fluid aligned"
            >
              Learned {data.details.count_total_learned_lessons} lessons
            </Link>
          </div>
        </div>
        <div className="twelve wide computer column ten wide tablet column">
          <div className="ui segment raised padded stackable">
            <div className="ui huge header">Lessons Learned</div>
            <div className="ui divider"></div>
            <table className="ui celled table stackable">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.details.learned_lessons.map((item) => (
                  <tr>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td className="single line">
                      <Link to={`/admin/categories/${item.id}`}>
                        <button className="ui button primary">Results</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LearnedLessons;
