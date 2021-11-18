import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { fetchAdminQuizQuestion } from "../../../features/AdminCategories/adminCategoriesWordsAPI";

const EditCategoryWords = () => {
  const { quizId, questionId } =
    useParams<{ quizId: string; questionId: string }>();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    (async () => {
      const question = await fetchAdminQuizQuestion(Number(questionId));
      reset({
        word: question.data.word,
        choices: [
          {
            value: question.data.choices[0].value,
            is_correct: question.data.choices[0].is_correct,
          },
          {
            value: question.data.choices[1].value,
            is_correct: question.data.choices[1].is_correct,
          },
          {
            value: question.data.choices[2].value,
            is_correct: question.data.choices[2].is_correct,
          },
          {
            value: question.data.choices[3].value,
            is_correct: question.data.choices[3].is_correct,
          },
        ],
      });
    })();
  }, [questionId, reset]);

  const onSubmit = async (data: {
    word: string;
    choices: { value: string; is_correct: boolean }[];
  }) => {
    // await saveAdminQuizQuestions(data, Number(quizId));
    history.push(`/admin/categories/${Number(quizId)}`);
  };

  return (
    <div className="ui stackable grid centered">
      <div className="eight wide column">
        <div className="ui stacked segment">
          <h2>Edit Word</h2>
          <form className="ui large form" onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label>Word</label>
              <input
                type="text"
                placeholder="Word"
                {...register("word", {
                  required: "Word is required",
                  min: 100,
                })}
              />
              {errors.word && (
                <p className="ui mini message">{errors.word.message}</p>
              )}
            </div>

            <div className="field">
              <label>Choices</label>
              <input
                type="text"
                placeholder="Choice"
                {...register("choices[0].value", {
                  required: "Choice is required",
                  min: 100,
                })}
              />
            </div>
            <div className="field">
              <div className="ui checkbox">
                <input
                  type="checkbox"
                  placeholder="Answer"
                  {...register("choices[0].is_correct")}
                />
                <label>Answer</label>
              </div>
            </div>

            <div className="field">
              <input
                type="text"
                placeholder="Choice"
                {...register("choices[1].value", {
                  required: "Choice is required",
                  min: 100,
                })}
              />
            </div>
            <div className="field">
              <div className="ui checkbox">
                <input
                  type="checkbox"
                  placeholder="Answer"
                  {...register("choices[1].is_correct")}
                />
                <label>Answer</label>
              </div>
            </div>

            <div className="field">
              <input
                type="text"
                placeholder="Choice"
                {...register("choices[2].value", {
                  required: "Choice is required",
                  min: 100,
                })}
              />
            </div>
            <div className="field">
              <div className="ui checkbox">
                <input
                  type="checkbox"
                  placeholder="Answer"
                  {...register("choices[2].is_correct")}
                />
                <label>Answer</label>
              </div>
            </div>

            <div className="field">
              <input
                type="text"
                placeholder="Choice"
                {...register("choices[3].value", {
                  required: "Choice is required",
                  min: 100,
                })}
              />
            </div>
            <div className="field">
              <div className="ui checkbox">
                <input
                  type="checkbox"
                  placeholder="Answer"
                  {...register("choices[3].is_correct")}
                />
                <label>Answer</label>
              </div>
            </div>

            <button className="ui fluid large primary submit button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryWords;
