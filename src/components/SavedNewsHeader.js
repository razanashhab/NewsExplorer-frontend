import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function SavedNewsHeader(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div className="savedNewsHeader">
      <h3 className="savedNewsHeader__subtitle"> Saved articles </h3>{" "}
      <h2 className="savedNewsHeader__title">
        {" "}
        {currentUser.name}, you have {props.savedNewsCount}
        saved articles{" "}
      </h2>{" "}
      <p className="savedNewsHeader__paragraph"> By keywords: </p>{" "}
    </div>
  );
}

export default SavedNewsHeader;
