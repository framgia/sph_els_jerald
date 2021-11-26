import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { saveAdminQuiz } from "../../../features/AdminCategories/adminCategoriesAPI";

const AddCategory = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: { title: string; description: string }) => {
    await saveAdminQuiz(data);

    history.push("/admin/categories");
  };

  return (
    <div className="ui stackable grid centered">
      <div className="eight wide column">
        <div className="ui stacked segment">
          <h2>Add Category</h2>
          <form className="ui large form" onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label>Title</label>
              <input
                type="text"
                placeholder="Title"
                {...register("title", {
                  required: "Title is required",
                })}
              />
              {errors.title && (
                <p className="ui mini message">{errors.title.message}</p>
              )}
            </div>
            <div className="field">
              <label>Description</label>
              <textarea
                placeholder="Description"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p className="ui mini message">{errors.description.message}</p>
              )}
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

export default AddCategory;
