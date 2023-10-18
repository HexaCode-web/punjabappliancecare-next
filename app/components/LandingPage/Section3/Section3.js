import React from "react";
import "./Section3.css";
import Image from "next/image";
const Section3 = (props) => {
  return (
    <section className="Section3">
      <div className="Left">
        {props.ServerData.title && (
          <h2 data-aos="fade-down">{props.ServerData.title}</h2>
        )}
        {props.ServerData.paragraph && (
          <p data-aos="fade-up">{props.ServerData.paragraph}</p>
        )}
      </div>
      {props.screenWidth > 1000 ? (
        <div className="Right" data-aos="fade-left">
          <Image
            src={props.ServerData.URL}
            alt="section image"
            width="638"
            height="453"
          />
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default Section3;
