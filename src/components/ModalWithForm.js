import React from "react";

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
  type,
  isValid,
}) {
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
  }, [onClose]);
  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""} `}
    >
      <div className={`modal__container modal__container_type_${type}`}>
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
            <button
              type="submit"
              className={`form__submit ${!isValid ? "button_inactive" : ""}`}
              disabled={!isValid}
            >
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
