import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import {
  fetchSelfDetails,
  updateSelfDetails,
} from "../features/EditProfile/editProfileAPI";

const EditProfile = () => {
  const history = useHistory();
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [avatar, setAvatar] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    (async () => {
      const details = await fetchSelfDetails();
      reset({
        firstName: details.data.firstName,
        middleName: details.data.middleName,
        lastName: details.data.lastName,
        email: details.data.email,
      });
      setAvatar(details.data.avatar);
      setIsLoading(false);
    })();
  }, [reset]);

  const onSubmit = async (data: {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    avatar: File;
  }) => {
    const passwordMatch = data.password === data.confirmPassword;
    setPasswordMatch(passwordMatch);

    if (passwordMatch) {
      const response = await updateSelfDetails(data);
      if (response?.status === 422) {
        setError(response.data.email);
      } else if (response?.status === 200) {
        setError("");
        history.push("/dashboard");
      }
    }
  };

  return (
    <Fragment>
      <div className="ui two column grid stackable">
        <div className="four wide computer column six wide tablet column">
          <div className="ui segment raised padded">
            <img
              className="ui medium rounded image centered"
              src={
                avatar
                  ? `${process.env.REACT_APP_API_URL}/storage/${avatar}`
                  : `https://www.chocolatebayou.org/wp-content/uploads/No-Image-Person-1536x1536.jpeg`
              }
              alt="Profile Pic"
            />
          </div>
        </div>
        <div className="twelve wide computer column ten wide tablet column">
          <div className={`ui segment raised padded ${isLoading && "loading"}`}>
            <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
              <div className="field">
                <label>Name</label>
                <div className="three fields">
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
                      <p className="ui mini message">
                        {errors.firstName.message}
                      </p>
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
                      <p className="ui mini message">
                        {errors.middleName.message}
                      </p>
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
                      <p className="ui mini message">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="field">
                <label>Email</label>
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
                <label>Password</label>
                <div className="two fields">
                  <div className="field">
                    <div className="ui left icon input">
                      <i className="lock icon"></i>
                      <input
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                          minLength: {
                            value: 7,
                            message: "Password must be atleast 7 characters",
                          },
                        })}
                      />
                    </div>
                    {errors.password && (
                      <p className="ui mini message">
                        {errors.password.message}
                      </p>
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
                          minLength: {
                            value: 7,
                            message:
                              "Confirm Password must be atleast 7 characters",
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
                </div>
              </div>

              <div className="field">
                <label>Profile picture</label>
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <input
                    type="file"
                    accept="image/*"
                    placeholder="Avatar"
                    {...register("avatar", {})}
                  />
                </div>
              </div>
              <button className="ui primary button" type="submit">
                Update profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditProfile;
