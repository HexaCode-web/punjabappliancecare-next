import React, { useState } from "react";
import "./Card.css";
const Card = (props) => {
  const Data = props.Data;

  const [showDescription, setShowDescription] = useState(false);
  return (
    <div
      data-aos="flip-left"
      className="Card"
      onMouseEnter={() => {
        setShowDescription(true);
      }}
      onMouseLeave={() => {
        setShowDescription(false);
      }}
    >
      {showDescription === false ? (
        <div className="TopText">
          {Data.MainNumber && <p className="MainNumber">{Data.MainNumber}</p>}
          {Data.subTitle && (
            <span
              className="subText"
              style={{ fontSize: Data.MainNumber ? "16px" : "22px" }}
            >
              {Data.subTitle}
            </span>
          )}
        </div>
      ) : (
        <div className="Description animate__animated animate__fast animate__fast animate__fast animate__fast animate__fadeIn">
          {Data.Description && <p>{Data.Description}</p>}
        </div>
      )}
    </div>
  );
};

export default Card;
