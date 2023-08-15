import React from "react";

function Preloader(props) {
  return (
    <div
      className={`preloader ${!props.showPreloader ? "preloader_hidden" : ""}`}
    >
      <i className="preloader__circle"> </i>{" "}
      <p className="preloader__paragraph"> Searching for news.. </p>{" "}
    </div>
  );
}

export default Preloader;
