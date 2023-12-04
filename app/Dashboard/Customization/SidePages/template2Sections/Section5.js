"use client";
import React from "react";
import SimpleEditor from "../SimpleEditor";

const Section5 = ({ data, handleInput, handlePostBodyChange }) => {
  return (
    <section className="SectionWrapper">
      <h4>Fifth Section:</h4>
      <div className="FormItem">
        <label htmlFor="HeaderTitle">Section Title:</label>
        <input
          type="text"
          id="HeaderTitle"
          name="title"
          value={data.section5.title}
          onChange={(e) => {
            handleInput(e, "Section5");
          }}
        />
      </div>
      <SimpleEditor
        handlePostBodyChange={(html) => {
          handlePostBodyChange("Section5", html);
        }}
        toolBarID={"fifthSection"}
        oldValue={data.section5.content}
        PreviewClassName="ViewTemplate"
      />
    </section>
  );
};

export default Section5;
