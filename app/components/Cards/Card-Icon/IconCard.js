import React from "react";
import "./IconCard.css";
import Image from "next/image";
const IconCard = ({ data }) => {
  return (
    <div className="IconCard" data-aos="fade-down">
      <div className="Card-content">
        {data.image && (
          <Image src={data.image} alt="card image" width="290" height="200" />
        )}
        {data.title && <h4>{data.title}</h4>}
        <div className="TextWrapper">{data.text && <p>{data.text}</p>}</div>
      </div>
    </div>
  );
};

export default IconCard;
