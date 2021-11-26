import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerUser } from "../features/SignUp/signUpAPI";
import classes from "./SignUp.module.css";

const SignUp = () => {
  const history = useHistory();
  const [error, setError] = useState<string>("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    const passwordMatch = data.password === data.confirmPassword;
    setPasswordMatch(passwordMatch);

    if (passwordMatch) {
      const response = await registerUser(data);

      if (response?.status === 422) {
        setError(response.data.email);
      } else if (response?.status === 201) {
        setError("");

        history.push("/signin");
      }
    }
  };

  return (
    <div
      className={`ui stackable grid center aligned middle aligned ${classes.container}`}
    >
      <div className="eight wide tablet column six wide computer column">
        <h1 className="centered">E-learning System</h1>
        <div className="ui stacked segment">
          <h2>Sign Up an Account</h2>
          <form className="ui large form" onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <input
                type="text"
                placeholder="First name"
                {...register("firstName", {
                  required: "First name is required",
                  maxLength: 80,
                })}
              />
              {errors.firstName && (
                <p className="ui mini message">{errors.firstName.message}</p>
              )}
            </div>
            <div className="field">
              <input
                type="text"
                placeholder="Middle name"
                {...register("middleName", {
                  required: "Middle name is required",
                  maxLength: 100,
                })}
              />
              {errors.middleName && (
                <p className="ui mini message">{errors.middleName.message}</p>
              )}
            </div>
            <div className="field">
              <input
                type="text"
                placeholder="Last name"
                {...register("lastName", {
                  required: "Last name is required",
                  maxLength: 100,
                })}
              />
              {errors.lastName && (
                <p className="ui mini message">{errors.lastName.message}</p>
              )}
            </div>
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
              {error && <p className="ui mini message">{error}</p>}
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
              {!passwordMatch && (
                <p className="ui mini message">Password must match</p>
              )}
            </div>
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon"></i>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    minLength: {
                      value: 7,
                      message: "Confirm Password must be atleast 7 characters",
                    },
                  })}
                />
              </div>
              {errors.confirmPassword && (
                <p className="ui mini message">
                  {errors.confirmPassword.message}
                </p>
              )}
              {!passwordMatch && (
                <p className="ui mini message">Password must match</p>
              )}
            </div>

            <button className="ui fluid large primary submit button">
              Sign Up
            </button>
            <Link to="/sigin" className="ui fluid large basic button">
              Already have an account?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
