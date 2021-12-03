import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectUsers, fetchUsersAsync } from "../features/Users/usersSlice";

const Users = () => {
  const data = useAppSelector(selectUsers);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  return (
    <Fragment>
      <h2>Users</h2>

      <div className="ui six column doubling stackable grid">
        {data.status === "loading" && (
          <div className="ui active dimmer">
            <div className="ui loader"></div>
          </div>
        )}

        {data.users &&
          data.status === "idle" &&
          data.users.map((item, index) => (
            <div className="column" key={index}>
              <div className="ui fluid card">
                <div className="image">
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
                  <Link to={`/show-profile/${item.id}`} className="header">
                    {item.firstName} {item.middleName.charAt(0)} {item.lastName}
                  </Link>
                </div>
              </div>
            </div>
          ))}

        {data.status === "idle" && !data.users[0] && (
          <h2 className="ui message">No users found</h2>
        )}
      </div>
    </Fragment>
  );
};

export default Users;
