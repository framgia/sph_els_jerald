import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { signInAdmin } from "../features/AdminSignIn/adminSignInAPI";
import CookieService from "../Services/CookieService";
import classes from "./AdminSignIn.module.css";

const AdminSignIn = () => {
  const history = useHistory();
  const [error, setError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: { email: string; password: string }) => {
    const response = await signInAdmin(data);

    if (response?.status === 401) {
      setError(response.data.message);
    } else if (response?.status === 201) {
      setError("");
      CookieService.set("adminToken", response.data.adminToken, { path: "/" });

      history.push("/admin/categories");
    }
  };

  return (
    <div
      className={`ui stackable grid center aligned middle aligned ${classes.container}`}
    >
      <div className="eight wide tablet column six wide computer column">
        <h1 className="centered">E-learning System</h1>
        <div className="ui label">
          E-learning System
          <div className="detail">Administrator</div>
        </div>
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
                <p className="ui mini red message">{errors.email.message}</p>
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
                <p className="ui mini red message">{errors.password.message}</p>
              )}
              {error && <p className="ui mini red message">{error}</p>}
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

export default AdminSignIn;
