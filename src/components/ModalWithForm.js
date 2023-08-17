import React from "react";
import { FormValidator } from "./../utils/FormValidator";

function ModalWithForm({
  isOpen,
  onClose,
  name,
  title,
  buttonText,
  linkText,
  onSubmit,
  children,
  onRedirect,
}) {
  const enableValidation = (config) => {
    const formElement = document.querySelector(config.formSelector);
    const validator = new FormValidator(formElement, config);
    validator.enableValidation();
  };

  React.useEffect(() => {
    enableValidation({
      formSelector: `#${name}`,
      inputSelector: ".form__input",
      submitButtonSelector: ".form__submit",
      inactiveButtonClass: "button_inactive",
      inputErrorClass: "form__input_type_error",
      errorClass: "form__input-error_active",
    });
  }, [isOpen, onClose]);

  React.useEffect(() => {
    const onMouseDown = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };
    document.querySelector(".modal").addEventListener("mousedown", onMouseDown);
    return () =>
      document
        .querySelector(".modal")
        .removeEventListener("mousedown", onMouseDown);
  }, []);

  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""} `}
    >
      <div className="modal__container">
        <button
          type="button"
          className="modal__close-button"
          onClick={onClose}
        />{" "}
        <h3 className="modal__title modal__title_alter-padding"> {title} </h3>{" "}
        <form
          className="form modal__form"
          id={name}
          name={name}
          onSubmit={onSubmit}
        >
          {" "}
          {children}{" "}
          <fieldset className="form__fieldset form__fieldset_position">
            <button type="submit" className="form__submit">
              {" "}
              {buttonText}{" "}
            </button>{" "}
          </fieldset>{" "}
        </form>{" "}
        <span className="modal__span">
          or{" "}
          <button className="modal__link" onClick={onRedirect}>
            {" "}
            {linkText}{" "}
          </button>{" "}
        </span>{" "}
      </div>{" "}
    </div>
  );
}

export default ModalWithForm;
