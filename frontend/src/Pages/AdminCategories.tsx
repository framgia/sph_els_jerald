import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { deleteAdminQuiz } from "../features/AdminCategories/adminCategoriesAPI";

import {
  selectAdminQuizzes,
  fetchAdminQuizAsync,
} from "../features/AdminCategories/adminCategoriesSlice";
import { Quiz } from "../Types/Quiz";

const AdminCategories = () => {
  const [page, setPage] = useState(1);

  const data = useAppSelector(selectAdminQuizzes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAdminQuizAsync(page));
  }, [dispatch, page]);

  const onDeleteHandler = async (quizId: number) => {
    await deleteAdminQuiz(quizId);

    dispatch(fetchAdminQuizAsync(page));
  };

  return (
    <Fragment>
      <h2>Categories</h2>
      <table className="ui celled padded table stackable">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.quizzes.data.map((item: Quiz) => (
            <tr key={item.id}>
              <td>
                <h4 className="ui header">
                  <Link to="/">{item.title}</Link>
                </h4>
              </td>
              <td>{item.description}</td>
              <td className="single line">
                <Link to="/">
                  <button className="ui button primary">Add Word</button>
                </Link>
                <Link to={`/admin/edit-category/${item.id}`}>
                  <button className="ui button">Edit</button>
                </Link>
                <button
                  className="ui red button"
                  onClick={() => onDeleteHandler(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={5}>
              <Link to={"/admin/add-category"}>
                <button className="ui button primary">Add Category</button>
              </Link>
              {(data.quizzes.next_page_url || data.quizzes.prev_page_url) && (
                <div className="ui right floated pagination menu">
                  {data.quizzes.prev_page_url && (
                    <button
                      className="ui button item"
                      onClick={() => setPage((state) => state - 1)}
                    >
                      Previous
                    </button>
                  )}

                  {data.quizzes.next_page_url && (
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

export default AdminCategories;
