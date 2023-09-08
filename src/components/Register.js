import React from "react";
import ModalWithForm from "./ModalWithForm";
import { withRouter } from "react-router-dom";
import { useFormAndValidation } from "./../hooks/useFormAndValidation";

function Register(props) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  React.useEffect(() => {
    resetForm();
  }, [props.isOpen, resetForm]);

  function handleRegister(e) {
    e.preventDefault();
    props.handleRegister({
      email: values.emailRg,
      username: values.username,
      password: values.passwordRg,
    });
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
      isValid={isValid}
    >
      <fieldset className="form__fieldset">
        <label className="form__label" htmlFor="emailRg">
          {" "}
          Email{" "}
        </label>{" "}
        <input
          type="email"
          className="form__input"
          id="emailRg"
          name="emailRg"
          placeholder="Enter email"
          required
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          value={values.emailRg || ""}
        />{" "}
        <span
          className={`emailRg-input-error form__input-error ${isValid.emailRg}`}
        >
          {errors.emailRg}
        </span>{" "}
        <label className="form__label" htmlFor="passwordRg">
          {" "}
          Password{" "}
        </label>{" "}
        <input
          type="password"
          className="form__input"
          id="passwordRg"
          name="passwordRg"
          placeholder="Enter password"
          required
          onChange={handleChange}
          value={values.passwordRg || ""}
        />{" "}
        <span
          className={`passwordRg-input-error form__input-error ${isValid.passwordRg}`}
        >
          {errors.passwordRg}
        </span>{" "}
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
          onChange={handleChange}
          value={values.username || ""}
        />{" "}
        <span
          className={`username-input-error form__input-error ${isValid.username}`}
        >
          {" "}
          {errors.username}
        </span>{" "}
      </fieldset>{" "}
    </ModalWithForm>
  );
}
export default withRouter(Register);
