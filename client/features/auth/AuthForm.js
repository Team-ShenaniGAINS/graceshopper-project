import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../../app/store";

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    const email = formName === "signup" ? evt.target.email.value : undefined;
    dispatch(authenticate({ username, password, email, method: formName }));
  };

  return (
    <div>
      <form
        onSubmit={(evt) => handleSubmit(evt)}
        name={name}
        className="authForm"
      >
        <img
          src="https://cdn.myshoptet.com/usr/www.animerch.cz/user/documents/upload/Loga/2022/Logo%20Animerch%20%20%C4%8Dtverec%20-%20modro%20%C4%8Dern%C3%A1.png"
          className="auth-logo"
        ></img>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        {displayName === "Sign Up" ? (
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="email" />
          </div>
        ) : undefined}
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && <div> {error} </div>}
      </form>
    </div>
  );
};

export default AuthForm;
