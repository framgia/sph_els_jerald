import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../app/hooks";

import {
  fetchQuizDetailAsync,
  fetchQuestionsAsync,
  selectLesson,
} from "../features/StartLesson/lessonSlice";
import { Answer } from "../Types/Answer";

import classes from "./StartLesson.module.css";

const Lesson = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const params: { quizId: string } = useParams();

  const { quizId } = params;

  const data = useAppSelector(selectLesson);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchQuizDetailAsync(Number(quizId)));
    dispatch(fetchQuestionsAsync(Number(quizId)));
  }, [dispatch, quizId]);

  const answerClickHandler = (isCorrect: number, choiceId: number) => {
    const answer = { isCorrect, choiceId };
    setAnswers((prevAnswer: Answer[]) => {
      return prevAnswer?.concat(answer);
    });

    if (isCorrect === 1) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < data.questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const submitHandler = () => {
    console.log(answers);
  };

  const resetHandler = () => {
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setShowScore(false);
  };

  return (
    <Fragment>
      {data.status === "loading" && (
        <div className="ui active dimmer">
          <div className="ui loader"></div>
        </div>
      )}

      {showScore ? (
        <div className="ui container segment">
          <div className="ui grid">
            <div className="sixteen wide column centered">
              {data.quiz.map((item) => (
                <Fragment key={item.id}>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </Fragment>
              ))}
              <h4>
                You scored {score} out of {data.questions.length}
              </h4>
              <button className="ui button" onClick={resetHandler}>
                Reset
              </button>
              <button className="ui button primary" onClick={submitHandler}>
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="ui container segment">
          <div className="ui grid">
            <div className="eight wide column centered">
              {data.quiz.map((item) => (
                <h2 key={item.id}>{item.title}</h2>
              ))}
              <h1>{data.questions[currentQuestion].word}</h1>
            </div>
            <div className="eight wide column centered">
              <h2>
                {currentQuestion + 1} out of {data.questions.length}
              </h2>
              {data.questions[currentQuestion].choices.map((choice) => (
                <div className={classes.choices} key={choice.id}>
                  <button
                    className="ui button primary"
                    onClick={() =>
                      answerClickHandler(choice.is_correct, choice.id)
                    }
                  >
                    {choice.value}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Lesson;
