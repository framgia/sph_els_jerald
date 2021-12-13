import { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  selectFollowing,
  fetchFollowingAsync,
} from "../features/Following/followingSlice";

const Following = () => {
  const data = useAppSelector(selectFollowing);
  const { userId } = useParams<{ userId: string }>();

  const fullName =
    data.details.user.firstName +
    " " +
    data.details.user.middleName.charAt(0) +
    " " +
    data.details.user.lastName;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFollowingAsync(Number(userId)));
  }, [dispatch, userId]);

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
          {data.error === 401 && <p>Unauthorized</p>}
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
                    <Link to={`/followers/${data.details.user.id}`}>
                      {data.details.count_total_followers}
                      <div className="sub header">Followers</div>
                    </Link>
                  </h1>
                </div>
                <div className="eight wide column">
                  <h1 className="ui header">
                    <Link to={`/following/${data.details.user.id}`}>
                      {data.details.count_total_following}
                      <div className="sub header">Following</div>
                    </Link>
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="twelve wide computer column ten wide tablet column">
            <div className="ui segment raised padded">
              <div className="ui huge header">Following</div>
              <div className="ui divider"></div>

              <div className="ui stackable doubling six column grid">
                {data.details.following.map(
                  (
                    item: {
                      id: number;
                      firstName: string;
                      middleName: string;
                      lastName: string;
                      avatar: string;
                    },
                    index
                  ) => (
                    <div className="column" key={item.id}>
                      <img
                        className="ui avatar image"
                        src={
                          item.avatar
                            ? `${process.env.REACT_APP_API_URL}/storage/${item.avatar}`
                            : `https://www.chocolatebayou.org/wp-content/uploads/No-Image-Person-1536x1536.jpeg`
                        }
                        alt="Profile Pic"
                      />
                      <Link to={`/show-profile/${item.id}`}>
                        {item.firstName} {item.middleName.charAt(0)}{" "}
                        {item.lastName}
                      </Link>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Following;
