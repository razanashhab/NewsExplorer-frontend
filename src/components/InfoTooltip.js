import React from "react";
import NotFound from "./../images/not-found_v1.svg";

function InfoTooltip(props) {
  return (
    <div
      className={`infotooltip ${
        !props.showinfoTooltip ? "infotooltip_hidden" : ""
      }`}
    >
      <img
        src={NotFound}
        alt="img of nothing found icon"
        className="infotooltip__image"
      />
      <h3 className="infotooltip__title"> Nothing found </h3>{" "}
      <p className="infotooltip__paragraph">
        {" "}
        Sorry, but nothing matched your search terms.{" "}
      </p>{" "}
    </div>
  );
}

export default InfoTooltip;
