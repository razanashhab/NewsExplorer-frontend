import React from "react";

function PopupMessage({ isOpen, onClose, name, message, onLoginClick }) {
  function redirectToSignin() {
    onClose();
    onLoginClick();
  }

  return (
    <div
      className={`modal modal_type_${name}  ${isOpen ? "modal_opened" : ""}`}
    >
      <div className="modal__container">
        <button
          type="button"
          className="modal__close-button"
          onClick={onClose}
        ></button>{" "}
        <div className="modal__message-wrapper">
          <p className="modal__paragraph">{message}</p>
          <button
            className="modal__link modal__link_enlarge"
            onClick={redirectToSignin}
          >
            Sign in
          </button>
        </div>
      </div>{" "}
    </div>
  );
}

export default PopupMessage;
