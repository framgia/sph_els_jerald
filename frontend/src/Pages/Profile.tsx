import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  selectProfile,
  fetchSelfProfileAsync,
} from "../features/Profile/profileSlice";
import { Activity } from "../Types/Activity";

const Profile = () => {
  const data = useAppSelector(selectProfile);

  const fullName =
    data.details.user.firstName +
    " " +
    data.details.user.middleName.charAt(0) +
    " " +
    data.details.user.lastName;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSelfProfileAsync());
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
            <button className="fluid ui button primary padded">Edit</button>
            <div className="ui hidden divider"></div>
            <div className="ui divider"></div>
            <div className="ui grid center aligned">
              <div className="eight wide column">
                <h1 className="ui header">
                  {data.details.count_total_followers}
                  <div className="sub header">Followers</div>
                </h1>
              </div>
              <div className="eight wide column">
                <h1 className="ui header">
                  {data.details.count_total_following}
                  <div className="sub header">Following</div>
                </h1>
              </div>
            </div>
            <div className="ui hidden divider"></div>
            <Link to="/" className="ui button basic fluid aligned">
              Learned {data.details.count_total_learned_words} words
            </Link>
            <Link to="/" className="ui button basic fluid aligned">
              Learned {data.details.count_total_learned_lessons} lessons
            </Link>
          </div>
        </div>
        <div className="twelve wide computer column ten wide tablet column">
          <div className="ui segment raised padded">
            <div className="ui huge header">Activities</div>
            <div className="ui divider"></div>
            {data.details.activities.map((item: Activity) => (
              <div className="ui large feed">
                <div className="event">
                  <div className="label">
                    <img
                      src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
                      alt="Profile Pic"
                    />
                  </div>
                  <div className="content">
                    <div className="summary">
                      {item.type === "QuizLog" && (
                        <Fragment>
                          You learned {item.count_learned_words} of{" "}
                          {item.count_total_words} words in{" "}
                          <Link to="/">{item.quiz_title}</Link>
                          <div className="date">{item.timestamp}</div>
                        </Fragment>
                      )}
                      {item.type === "Follow" && (
                        <Fragment>
                          You followed{" "}
                          <Link to="/">{item.follow_firstName}</Link>
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

export default Profile;