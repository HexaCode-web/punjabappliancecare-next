import React from "react";
import "./Section9Cards.css";
import Link from "next/link";
import Image from "next/image";
const Section9Cards = ({ cardData }) => {
  return (
    <div className="Section9Card">
      <Image src={cardData.url} alt={cardData.title} width="317" height="216" />
      <h3>{cardData.title}</h3>
      <p>{cardData.description}</p>
      <div className="linkWrapper">
        {cardData.firstLink && (
          <Link className="Button" href={cardData.firstLink}>
            {cardData.firstLinkText}
          </Link>
        )}
        {cardData.secondLink && (
          <Link className="Button" href={cardData.secondLink}>
            {cardData.secondLinkText}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Section9Cards;
