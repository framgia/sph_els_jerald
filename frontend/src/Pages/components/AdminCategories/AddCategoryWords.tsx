import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { saveAdminQuizQuestions } from "../../../features/AdminCategories/adminCategoriesWordsAPI";

const AddCategoryWords = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: {
    word: string;
    choices: { value: string; is_correct: boolean }[];
  }) => {
    await saveAdminQuizQuestions(data, Number(quizId));
    history.push(`/admin/categories/${Number(quizId)}`);
  };

  return (
    <div className="ui stackable grid centered">
      <div className="eight wide column">
        <div className="ui stacked segment">
          <h2>Add Word</h2>
          <form className="ui large form" onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label>Word</label>
              <input
                type="text"
                placeholder="Word"
                {...register("word", {
                  required: "Word is required",
                })}
              />
              {errors.word && (
                <p className="ui mini red message">{errors.word.message}</p>
              )}
            </div>

            <div className="field">
              <label>Choices</label>
              <input
                type="text"
                placeholder="Choice"
                {...register("choices[0].value", {
                  required: "Choice is required",
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

export default AddCategoryWords;
