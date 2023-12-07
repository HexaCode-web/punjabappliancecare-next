"use client";
import React, { useState } from "react";

const Section4 = ({ FetchedData, UpdateData, SpecialStyles, setOuterData }) => {
  const [data, setData] = useState(FetchedData);

  const handleCheckboxChange = () => {
    setData((prev) => ({ ...prev, Show: !prev.Show }));
    if (SpecialStyles) {
      setOuterData((prev) => {
        return {
          ...prev,
          Section4: { ...prev.Section4, Show: !prev.Section4.Show },
        };
      });
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
    if (SpecialStyles) {
      setOuterData((prev) => {
        return { ...prev, Section4: { ...prev.Section4, [name]: value } };
      });
    }
  };

  return (
    <div className="DataEntry section4">
      <h3>Section 4</h3>

      {!SpecialStyles && (
        <span style={{ color: "red", margin: "0 auto" }}>
          these modifications will reflect on repairs, installations and pages
        </span>
      )}
      <div className="formItem form-check CheckBox">
        <label className="form-check-label">
          Show Section:
          <input
            className="form-check-input"
            type="checkbox"
            checked={data.Show}
            onChange={handleCheckboxChange}
          />
        </label>
      </div>
      <div className="FormItem" id="Title">
        <label htmlFor="Title">Section Title:</label>
        <input
          type="text"
          required
          id="Title"
          name="Title"
          value={data.Title}
          onChange={handleInput}
        />
      </div>
      <div className="FormItem">
        <label htmlFor="SubTitle">Paragraph:</label>
        <textarea
          type="text"
          required
          id="SubTitle"
          name="paragraph"
          value={data.paragraph}
          onChange={handleInput}
        />
      </div>

      {!SpecialStyles && (
        <button
          className="Button View"
          id="Submit"
          onClick={() => {
            UpdateData("Section4", data);
          }}
        >
          Save
        </button>
      )}
    </div>
  );
};

export default Section4;
