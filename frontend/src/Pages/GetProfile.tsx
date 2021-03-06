import { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  selectGetProfile,
  fetchGetProfileAsync,
} from "../features/GetProfile/getProfileSlice";
import { Activity } from "../Types/Activity";
import { follow, unfollow } from "../features/Follow/followAPI";

const GetProfile = () => {
  const data = useAppSelector(selectGetProfile);
  const { userId } = useParams<{ userId: string }>();

  const fullName =
    data.details.user.firstName +
    " " +
    data.details.user.middleName.charAt(0) +
    " " +
    data.details.user.lastName;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGetProfileAsync(Number(userId)));
  }, [dispatch, userId]);

  const onFollowHandler = async (followId: number) => {
    await follow(followId);

    dispatch(fetchGetProfileAsync(Number(userId)));
  };

  const onUnfollowHandler = async (followId: number) => {
    await unfollow(followId);

    dispatch(fetchGetProfileAsync(Number(userId)));
  };

  return (
    <Fragment>
      {data.status === "loading" && (
        <div className="ui active dimmer">
          <div className="ui loader"></div>
        </div>
      )}

      {data.status === "failed" && data.error && (
        <div className="ui red message">
          <div className="header">Error {data.error}</div>
          {data.error === 404 && <p>Not Found</p>}
        </div>
      )}

      {data.status === "idle" && (
        <div className="ui two column grid stackable">
          <div className="four wide computer column six wide tablet column">
            <div className="ui segment raised padded">
              <img
                className="ui small rounded image centered"
                src={
                  data.details.user.avatar
                    ? `${process.env.REACT_APP_API_URL}/storage/${data.details.user.avatar}`
                    : `https://www.chocolatebayou.org/wp-content/uploads/No-Image-Person-1536x1536.jpeg`
                }
                alt="Profile Pic"
              />
              <h1 className="ui huge header centered">{fullName}</h1>
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
              {data.details.signed_in_user !== data.details.user.id && (
                <div>
                  {data.details.isFollowed ? (
                    <button
                      className="fluid ui button padded"
                      onClick={() => onUnfollowHandler(data.details.user.id)}
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      className="fluid ui primary button padded"
                      onClick={() => onFollowHandler(data.details.user.id)}
                    >
                      Follow
                    </button>
                  )}
                </div>
              )}
              <button className="ui button basic fluid aligned">
                Learned {data.details.count_total_learned_words} words
              </button>
              <button className="ui button basic fluid aligned">
                Learned {data.details.count_total_learned_lessons} lessons
              </button>
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
                            ? `${process.env.REACT_APP_API_URL}/storage/${item.avatar}`
                            : `https://www.chocolatebayou.org/wp-content/uploads/No-Image-Person-1536x1536.jpeg`
                        }
                        alt="Profile Pic"
                      />
                    </div>
                    <div className="content">
                      <div className="summary">
                        {item.type === "QuizLog" && (
                          <Fragment>
                            {data.details.signed_in_user === item.user_id ? (
                              <Link to="/profile">You</Link>
                            ) : (
                              <Link to={`/show-profile/${item.user_id}`}>
                                {item.firstName}
                              </Link>
                            )}{" "}
                            learned {item.count_learned_words} of{" "}
                            {item.count_total_words} words in {item.quiz_title}
                            <div className="date">{item.timestamp}</div>
                          </Fragment>
                        )}
                        {item.type === "Follow" && (
                          <Fragment>
                            {data.details.signed_in_user === item.user_id ? (
                              <Link to="/profile">You</Link>
                            ) : (
                              <Link to={`/show-profile/${item.user_id}`}>
                                {item.user_firstName}
                              </Link>
                            )}{" "}
                            followed{" "}
                            {data.details.signed_in_user === item.follow_id ? (
                              <Link to="/profile">You</Link>
                            ) : (
                              <Link to={`/show-profile/${item.follow_id}`}>
                                {item.follow_firstName}
                              </Link>
                            )}
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
      )}
    </Fragment>
  );
};

export default GetProfile;
