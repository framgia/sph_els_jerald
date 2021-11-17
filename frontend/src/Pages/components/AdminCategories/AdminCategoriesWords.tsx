import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { deleteAdminQuizQuestion } from "../../../features/AdminCategories/adminCategoriesWordsAPI";

import {
  selectAdminQuizQuestions,
  fetchAdminQuizQuestionsAsync,
} from "../../../features/AdminCategories/adminCategoriesWordsSlice";

const AdminCategoriesWords = () => {
  const [page, setPage] = useState(1);
  const { quizId } = useParams<{ quizId: string }>();

  const data = useAppSelector(selectAdminQuizQuestions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchAdminQuizQuestionsAsync({ quizId: Number(quizId), page: page })
    );
  }, [dispatch, page, quizId]);

  const onDeleteHandler = async (questionId: number) => {
    await deleteAdminQuizQuestion(questionId);

    dispatch(
      fetchAdminQuizQuestionsAsync({ quizId: Number(quizId), page: page })
    );
  };

  return (
    <Fragment>
      <h2>Categories</h2>
      <table className="ui celled padded table stackable">
        <thead>
          <tr>
            <th>Word</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.quizzes.data.map((item) => (
            <tr key={item.id}>
              <td>
                <h4 className="ui header">{item.word}</h4>
              </td>
              <td className="single line">
                <Link to="/">
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
              <Link to={`/admin/categories/${Number(quizId)}/words`}>
                <button className="ui button primary">Add Word</button>
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

export default AdminCategoriesWords;
