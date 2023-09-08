import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function NewsCard(props) {
  // const savedArticles = JSON.parse(localStorage.getItem("savedArticles"));
  const [showSavedTooltip, setShowSavedTooltip] = React.useState(false);
  const [showDeleteTooltip, setShowDeleteTooltip] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);
  const [savedIconActiveStatus, setSavedIconActiveStatus] =
    React.useState(false);
  const [deleteIconActiveStatus, setDeleteIconActiveStatus] =
    React.useState(false);

  const [savedIconSavedStatus, setSavedIconSavedStatus] = React.useState(false);
  const [cardId, setCardId] = React.useState(props.id || props._id);

  // React.useMemo(() => {
  //   localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
  // }, [savedArticles]);

  function saveArticle() {
    if (currentUser.email) {
      if (savedIconSavedStatus || cardId) {
        props.handleDeleteSavedArticle(cardId);
        setSavedIconSavedStatus(false);
      } else {
        let card = {
          keyword: props.keyword,
          title: props.title,
          text: props.description,
          date: props.publishedAt,
          source: props.source,
          link: props.url,
          image: props.image,
        };
        props.handleSaveArticle(card, handleCardIdChange);
        setSavedIconSavedStatus(true);
      }
    } else {
      //show signin popup
      props.onLoginClick();
    }
  }

  function deleteSavedArticle() {
    props.handleDeleteSavedArticle(cardId, setCardId);
  }

  function handleCardIdChange(cardId) {
    setCardId(cardId);
    setSavedIconSavedStatus(true);
  }

  function handleShowSaveTooltip() {
    setSavedIconActiveStatus(true);
    if (!currentUser.email) {
      setShowSavedTooltip(true);
    }
  }

  function handleShowDeleteTooltip() {
    setDeleteIconActiveStatus(true);
    setShowDeleteTooltip(true);
  }

  function handleHideSaveTooltip() {
    setSavedIconActiveStatus(false);
    if (!currentUser.email) {
      setShowSavedTooltip(false);
    }
  }

  function handleHideDeleteTooltip() {
    setDeleteIconActiveStatus(false);
    setShowDeleteTooltip(false);
  }

  return (
    <div className="card">
      <button
        type="button"
        aria-label="save button"
        className={`card__button ${
          props.isSavedNews ? "card__button_hidden" : ""
        }`}
        onClick={saveArticle}
        onMouseOver={handleShowSaveTooltip}
        onMouseLeave={handleHideSaveTooltip}
      >
        <i
          className={`card__icon card__icon-saved_status_new ${
            !(savedIconSavedStatus || cardId) && savedIconActiveStatus
              ? "card__icon-saved_status_active"
              : savedIconSavedStatus || cardId
              ? "card__icon-saved_status_saved"
              : ""
          }`}
        ></i>
      </button>
      <button
        type="button"
        aria-label="delete button"
        className={`card__button ${
          !props.isSavedNews ? "card__button_hidden" : ""
        }`}
        onClick={deleteSavedArticle}
        onMouseOver={handleShowDeleteTooltip}
        onMouseLeave={handleHideDeleteTooltip}
      >
        <i
          className={`card__icon ${
            deleteIconActiveStatus
              ? "card__icon-trash_active"
              : "card__icon-trash"
          }`}
        ></i>
      </button>
      <p
        className={`card__tooltip ${
          !showSavedTooltip ? "card__tooltip_hidden" : ""
        }`}
      >
        Sign in to save articles
      </p>
      <p
        className={`card__tooltip ${
          !showDeleteTooltip ? "card__tooltip_hidden" : ""
        }`}
      >
        Remove from saved
      </p>
      <p className={`card__tag ${props.isSavedNews ? "" : "card__tag_hidden"}`}>
        {props.keyword}
      </p>
      <img
        className="card__image"
        src={props.image}
        alt={`img of nwes cover`}
      />
      <div className="card__info">
        <p className="card__subtitle">
          {" "}
          {new Date(props.publishedAt).toLocaleString("default", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <h3 className="card__title"> {props.title}</h3>
        <p className="card__paragraph">{props.description}</p>
        <span className="card__span">{props.source} </span>
        <span className="card__span_hidden">{props.url} </span>
      </div>
    </div>
  );
}

export default NewsCard;
