import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function NewsCard(props) {
  const [savedArticles, setSavedArticles] = React.useState(
    JSON.parse(localStorage.getItem("savedArticles"))
  );
  const [showSavedTooltip, setShowSavedTooltip] = React.useState(false);
  const [showDeleteTooltip, setShowDeleteTooltip] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);
  const [savedIconActiveStatus, setSavedIconActiveStatus] =
    React.useState(false);
  const [deleteIconActiveStatus, setDeleteIconActiveStatus] =
    React.useState(false);

  const [savedIconSavedStatus, setSavedIconSavedStatus] = React.useState(false);

  React.useMemo(() => {
    localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
  }, [savedArticles]);

  function saveArticle(evt) {
    // localStorage.removeItem("savedArticles");
    if (currentUser.email) {
      if (localStorage.getItem("savedArticles")) {
        let card = {
          image: props.image,
          publishedAt: props.publishedAt,
          title: props.title,
          description: props.description,
          source: props.source,
        };
        savedArticles.push(card);
      } else {
        let card = {
          image: props.image,
          publishedAt: props.publishedAt,
          title: props.title,
          description: props.description,
          source: props.source,
        };
        savedArticles.push(card);
      }
      setSavedIconSavedStatus(true);
    }
  }

  function deleteSavedArticle(evt) {
    const index = savedArticles.findIndex((itm) => {
      return itm.title === props.title;
    });
    setSavedArticles(savedArticles.splice(index, 1));
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
    <div className="element__card card">
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
            !savedIconSavedStatus && savedIconActiveStatus
              ? "card__icon-saved_status_active"
              : savedIconSavedStatus
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

      <p className="card__tag card__tag_hidden">Nature</p>
      <img className="card__image" src={props.image} alt={`image of lago`} />
      <div className="card__info">
        <p className="card__subTitle">
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
      </div>
    </div>
  );
}

export default NewsCard;
