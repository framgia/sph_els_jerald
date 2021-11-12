import { Fragment, useState } from "react";

const SignIn = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const emailChangeHandler = (event: any) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event: any) => {
    setEnteredPassword(event.target.value);
  };

  const loginHandler = (event: any) => {
    event.preventDefault();

    if (enteredEmail.trim().length === 0 || !enteredEmail.includes("@")) {
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
    }

    if (
      enteredPassword.trim().length === 0 ||
      enteredPassword.trim().length < 7
    ) {
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }

    if (
      enteredEmail.trim().length === 0 ||
      !enteredEmail.includes("@") ||
      enteredPassword.trim().length === 0 ||
      enteredPassword.trim().length < 7
    ) {
      return;
    }

    console.log(enteredEmail, enteredPassword);
  };

  return (
    <Fragment>
      <div className="ui stackable grid centered">
        <div className="eight wide column">
          <form
            className="ui large form"
            onSubmit={loginHandler}
            id="sign-up-form"
          >
            <div className="ui stacked segment">
              <h2>Sign In to your Account</h2>
              <div className="field">
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail address"
                    required
                    value={enteredEmail}
                    onChange={emailChangeHandler}
                  />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon"></i>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={enteredPassword}
                    onChange={passwordChangeHandler}
                  />
                </div>
              </div>
              <button className="ui fluid large primary submit button">
                Sign In
              </button>
            </div>
          </form>
          {(errorEmail || errorPassword) && (
            <div className="ui error message">
              <ul>
                {errorEmail && <li>Please enter valid email address</li>}
                {errorPassword && (
                  <li>Please enter password at least 7 characters</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default SignIn;
