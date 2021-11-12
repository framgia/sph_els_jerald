import { useForm } from "react-hook-form";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: { email: string; password: string }) => {
    console.log(data);
  };

  return (
    <div className="ui stackable grid centered">
      <div className="eight wide column">
        <div className="ui stacked segment">
          <h2>Sign In</h2>
          <form className="ui large form" onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <div className="ui left icon input">
                <i className="user icon"></i>
                <input
                  type="text"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email address is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Please enter valid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="ui mini message">{errors.email.message}</p>
              )}
            </div>
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon"></i>
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 7,
                      message: "Password must be atleast 7 characters",
                    },
                  })}
                />
              </div>
              {errors.password && (
                <p className="ui mini message">{errors.password.message}</p>
              )}
            </div>

            <button className="ui fluid large primary submit button">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
