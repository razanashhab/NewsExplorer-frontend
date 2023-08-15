import React from "react";
import NotFound from "./../images/not-found_v1.svg";

function InfoTooltip(props) {
  return (
    <div
      className={`InfoTooltip ${
        !props.showinfoTooltip ? "InfoTooltip_hidden" : ""
      }`}
    >
      <img src={NotFound} className="InfoTooltip__image" />
      <h3 className="InfoTooltip__title"> Nothing found </h3>{" "}
      <p className="InfoTooltip__paragraph">
        {" "}
        Sorry, but nothing matched your search terms.{" "}
      </p>{" "}
    </div>
  );
}

export default InfoTooltip;
