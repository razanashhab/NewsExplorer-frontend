import React from "react";
import ModalWithForm from "./ModalWithForm";
import { withRouter } from "react-router-dom";
import { useFormAndValidation } from "./../hooks/useFormAndValidation";

function Login(props) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  React.useEffect(() => {
    resetForm();
  }, [props.isOpen, resetForm]);

  function handleLogin(e) {
    e.preventDefault();
    props.handleLogin({ email: values.email, password: values.password });
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
      type="login"
      isValid={isValid}
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
          onChange={handleChange}
          value={values.email || ""}
        />{" "}
        <span
          className={`email-input-error form__input-error ${isValid.email}`}
        >
          {" "}
          {errors.email}
        </span>{" "}
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
          onChange={handleChange}
          value={values.password || ""}
        />{" "}
        <span
          className={`password-input-error form__input-error ${isValid.password}`}
        >
          {" "}
          {errors.password}
        </span>{" "}
      </fieldset>{" "}
    </ModalWithForm>
  );
}
export default withRouter(Login);
