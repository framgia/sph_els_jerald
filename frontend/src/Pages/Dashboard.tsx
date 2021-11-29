import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  selectDashboard,
  fetchSelfDashboardAsync,
} from "../features/Dashboard/dashboardSlice";
import { Activity } from "../Types/Activity";

const Dashboard = () => {
  const data = useAppSelector(selectDashboard);

  const fullName =
    data.details.user.firstName +
    " " +
    data.details.user.middleName.charAt(0) +
    " " +
    data.details.user.lastName;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSelfDashboardAsync());
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
              src={
                data.details.user.avatar
                  ? `http://127.0.0.1:8000/storage/${data.details.user.avatar}`
                  : `https://www.chocolatebayou.org/wp-content/uploads/No-Image-Person-1536x1536.jpeg`
              }
              alt="Profile Pic"
            />
            <h1 className="ui huge header centered">{fullName}</h1>
            <Link
              to={`/learned-words`}
              className="ui button basic fluid aligned"
            >
              Learned {data.details.count_total_learned_words} words
            </Link>
            <Link
              to={`/learned-lessons`}
              className="ui button basic fluid aligned"
            >
              Learned {data.details.count_total_learned_lessons} lessons
            </Link>
          </div>
        </div>
        <div className="twelve wide computer column ten wide tablet column">
          <div className="ui segment raised padded">
            <div className="ui huge header">Activities</div>
            <div className="ui divider"></div>
            {data.details.activities.map((item: Activity, index) => (
              <div className="ui large feed" key={index}>
                <div className="event">
                  <div className="label">
                    <img
                      src={
                        item.avatar
                          ? `http://127.0.0.1:8000/storage/${item.avatar}`
                          : `https://www.chocolatebayou.org/wp-content/uploads/No-Image-Person-1536x1536.jpeg`
                      }
                      alt="Profile Pic"
                    />
                  </div>
                  <div className="content">
                    <div className="summary">
                      {item.type === "QuizLog" && (
                        <Fragment>
                          {data.details.user.id === item.user_id ? (
                            <Link to="/profile">You</Link>
                          ) : (
                            <Link to={`/show-profile/${item.user_id}`}>
                              {item.firstName}
                            </Link>
                          )}{" "}
                          learned {item.count_learned_words} of{" "}
                          {item.count_total_words} words in{" "}
                          {data.details.user.id === item.user_id ? (
                            <Link to={`/learned-lesson/result/${item.quiz_id}`}>
                              {item.quiz_title}
                            </Link>
                          ) : (
                            <Fragment>{item.quiz_title}</Fragment>
                          )}
                          <div className="date">{item.timestamp}</div>
                        </Fragment>
                      )}
                      {item.type === "Follow" && (
                        <Fragment>
                          {data.details.user.id === item.user_id ? (
                            <Link to="/profile">You</Link>
                          ) : (
                            <Link to={`/show-profile/${item.user_id}`}>
                              {item.user_firstName}
                            </Link>
                          )}{" "}
                          followed{" "}
                          {data.details.user.id === item.follow_id ? (
                            <Link to="/profile">You</Link>
                          ) : (
                            <Link to={`/show-profile/${item.follow_id}`}>
                              {item.follow_firstName}
                            </Link>
                          )}{" "}
                          <div className="date">{item.timestamp}</div>
                        </Fragment>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
