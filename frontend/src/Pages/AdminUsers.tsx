import { Fragment, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";

import {
  selectAdminUsers,
  fetchAdminUsersAsync,
} from "../features/AdminUsers/adminUsersSlice";

const AdminUsers = () => {
  const [page, setPage] = useState(1);

  const data = useAppSelector(selectAdminUsers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAdminUsersAsync(page));
  }, [dispatch, page]);

  return (
    <Fragment>
      <h2>Categories</h2>
      <table className="ui celled padded table stackable">
        <thead>
          <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {data.users.data.map((item) => (
            <tr key={item.id}>
              <td>
                <h4 className="ui header">{item.email}</h4>
              </td>
              <td>{item.firstName}</td>
              <td>{item.middleName}</td>
              <td>{item.lastName}</td>
              <td>
                {new Date(item.created_at).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={5}>
              {(data.users.next_page_url || data.users.prev_page_url) && (
                <div className="ui right floated pagination menu">
                  {data.users.prev_page_url && (
                    <button
                      className="ui button item"
                      onClick={() => setPage((state) => state - 1)}
                    >
                      Previous
                    </button>
                  )}

                  {data.users.next_page_url && (
                    <button
                      className="ui button item"
                      onClick={() => setPage((state) => state + 1)}
                    >
                      Next
                    </button>
                  )}
                </div>
              )}
            </th>
          </tr>
        </tfoot>
      </table>
    </Fragment>
  );
};

export default AdminUsers;
