import { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  selectLearnedLessonResult,
  fetchLearnedLessonResultAsync,
} from "../features/LearnedLessonResult/learnedLessonResultSlice";

const LearnedLessonResult = () => {
  const data = useAppSelector(selectLearnedLessonResult);
  const { quizId } = useParams<{ quizId: string }>();

  const fullName =
    data.details.user.firstName +
    " " +
    data.details.user.middleName.charAt(0) +
    " " +
    data.details.user.lastName;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLearnedLessonResultAsync(Number(quizId)));
  }, [dispatch, quizId]);

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
            <div className="ui huge header">{data.details.quiz.title}</div>
            <div className="ui tiny header">
              Result: {data.details.correct_answers} of{" "}
              {data.details.total_answers}
            </div>
            <div className="ui divider"></div>
            <table className="ui celled table stackable">
              <thead>
                <tr>
                  <th>Word</th>
                  <th>Answer</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {data.details.results.map((item) => (
                  <tr>
                    <td>{item.word}</td>
                    <td>{item.answer}</td>
                    <td className="center aligned">
                      {item.isCorrect ? (
                        <i className="large green checkmark icon"></i>
                      ) : (
                        <i className="large red close icon"></i>
                      )}
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

export default LearnedLessonResult;
