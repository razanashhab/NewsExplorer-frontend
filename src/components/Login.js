import React from "react";
import ModalWithForm from "./ModalWithForm";
import { withRouter } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = React.useState(" ");
  const [password, setPassword] = React.useState(" ");
  React.useEffect(() => {
    setEmail("");
    setPassword("");
  }, [props.isOpen]);

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleLogin(e) {
    e.preventDefault();
    props.handleLogin();
  }

  function redirectToSignup() {
    props.onClose();
    props.onSignup();
  }

  return (
    <ModalWithForm
      name="LoginPopup"
      title="Sign in"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Sign in"
      linkText="Sign up"
      onSubmit={handleLogin}
      onRedirect={redirectToSignup}
    >
      <fieldset className="form__fieldset">
        <label className="form__label" htmlFor="email">
          {" "}
          Email{" "}
        </label>{" "}
        <input
          type="email"
          className="form__input"
          id="email"
          name="email"
          placeholder="Enter email"
          required
          minLength="1"
          maxLength="30"
          onChange={handleEmailChange}
          value={email}
        />{" "}
        <span className="email-input-error form__input-error"> </span>{" "}
        <label className="form__label" htmlFor="password">
          {" "}
          Password{" "}
        </label>{" "}
        <input
          type="password"
          className="form__input"
          id="password"
          name="password"
          placeholder="Enter password"
          required
          onChange={handlePasswordChange}
          value={password}
        />{" "}
        <span className="password-input-error form__input-error"> </span>{" "}
      </fieldset>{" "}
    </ModalWithForm>
  );
}
export default withRouter(Login);
