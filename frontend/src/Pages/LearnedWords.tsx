import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  selectLearnedWords,
  fetchLearnedWordsAsync,
} from "../features/LearnedWords/learnedWordsSlice";

const LearnedWords = () => {
  const data = useAppSelector(selectLearnedWords);

  const fullName =
    data.details.user.firstName +
    " " +
    data.details.user.middleName.charAt(0) +
    " " +
    data.details.user.lastName;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLearnedWordsAsync());
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
                  ? `${process.env.REACT_APP_API_URL}/storage/${data.details.user.avatar}`
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
          </div>
        </div>
        <div className="twelve wide computer column ten wide tablet column">
          <div className="ui segment raised padded stackable">
            <div className="ui huge header">Words Learned</div>
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
                {data.details.learned_words.map((item, index) => (
                  <tr key={index}>
                    <td>{item.word}</td>
                    <td>{item.answer}</td>
                    <td className="center aligned">
                      <i className="large green checkmark icon"></i>
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

export default LearnedWords;
