import React from "react";
import "./Section7.css";
import ContactForm from "../../PopUps/ContactForm";
const Section7 = (props) => {
  const ServerData = props.ServerData;
  return (
    <div className="Section7">
      <div className="Left">
        <h2 data-aos="fade-down">{ServerData.title}</h2>
        <div
          data-aos="fade-right"
          dangerouslySetInnerHTML={{ __html: ServerData.content }}
        ></div>
      </div>
      <div className="Right">
        <h2 data-aos="fade-down">{ServerData.formHeader}</h2>
        <ContactForm textColor="Black" />
      </div>
    </div>
  );
};

export default Section7;
