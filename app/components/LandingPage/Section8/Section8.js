import React from "react";
import CollapsibleElement from "../../CollapsibleElement/CollapsibleElement";
import "./Section8.css";
const Section8 = (props) => {
  const serverData = props.ServerData;
  const RenderFAQ = serverData.FAQ.map((question) => {
    return (
      <CollapsibleElement
        key={question.id}
        buttonText={question.Q}
        Text={question.A}
      />
    );
  });
  return (
    <div className="Section8">
      {serverData.FAQ.length > 0 && (
        <h2 data-aos="fade-down">{serverData.title}</h2>
      )}
      {RenderFAQ}
    </div>
  );
};

export default Section8;
