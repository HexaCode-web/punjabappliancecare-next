import React from "react";
import SimpleEditor from "../SimpleEditor";
const Section1 = ({ data, handleInput, handlePostBodyChange }) => {
  return (
    <section className="SectionWrapper">
      <h4>First Section:</h4>
      <div className="FormItem">
        <label htmlFor="HeaderTitle">Section Title:</label>
        <input
          type="text"
          id="HeaderTitle"
          name="title"
          value={data.section1.title}
          onChange={(e) => {
            handleInput(e, "Section1");
          }}
        />
      </div>
      <SimpleEditor
        handlePostBodyChange={(html) => {
          handlePostBodyChange("Section1", html);
        }}
        toolBarID={"FirstSection"}
        oldValue={data.section1.content}
        PreviewClassName="ViewTemplate"
      />
    </section>
  );
};

export default Section1;
