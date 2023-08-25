import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function SavedNewsHeader(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div className="savednewsheader">
      <h3 className="savednewsheader__subtitle"> Saved articles </h3>{" "}
      <h1 className="savednewsheader__title">
        {" "}
        {currentUser.name}, you have {props.savedNewsCount}
        saved articles{" "}
      </h1>{" "}
      <p className="savednewsheader__paragraph"> By keywords: </p>{" "}
    </div>
  );
}

export default SavedNewsHeader;
