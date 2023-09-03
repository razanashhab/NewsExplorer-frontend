import React from "react";
import ModalWithForm from "./ModalWithForm";
import { withRouter } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = React.useState(" ");
  const [password, setPassword] = React.useState(" ");
  const [username, setUsername] = React.useState(" ");
  React.useEffect(() => {
    setEmail("");
    setPassword("");
    setUsername("");
  }, [props.isOpen]);

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleUsernameChange(evt) {
    setUsername(evt.target.value);
  }

  function handleRegister(e) {
    e.preventDefault();
    props.handleRegister({ email, username, password });
  }

  function redirectToSignin() {
    props.onClose();
    props.onLoginClick();
  }

  return (
    <ModalWithForm
      name="RegisterPopup"
      title="Sign up"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Sign up"
      linkText="Sign in"
      onSubmit={handleRegister}
      onRedirect={redirectToSignin}
      type="register"
    >
      <fieldset className="form__fieldset">
        <label className="form__label" htmlFor="email">
          {" "}
          Email{" "}
        </label>{" "}
        <input
          type="email"
          className="form__input"
          id="emailRg"
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
          id="passwordRg"
          name="password"
          placeholder="Enter password"
          required
          onChange={handlePasswordChange}
          value={password}
        />{" "}
        <span className="password-input-error form__input-error"> </span>{" "}
        <label className="form__label" htmlFor="username1">
          {" "}
          username{" "}
        </label>{" "}
        <input
          type="text"
          className="form__input"
          id="username"
          name="username"
          placeholder="Enter username"
          required
          onChange={handleUsernameChange}
          value={username}
        />{" "}
        <span className="username-input-error form__input-error"> </span>{" "}
      </fieldset>{" "}
    </ModalWithForm>
  );
}
export default withRouter(Register);
