import React from "react";
import "./SkillCard.css";
import Image from "next/image";
const SkillCard = (prop) => {
  return (
    <div className="SkillCard" data-aos="flip-left">
      {prop.Data.URL && (
        <Image src={prop.Data.URL} alt="skill image" height="100" width="200" />
      )}
      {prop.Data.Name && <p>{prop.Data.Name}</p>}
    </div>
  );
};

export default SkillCard;
