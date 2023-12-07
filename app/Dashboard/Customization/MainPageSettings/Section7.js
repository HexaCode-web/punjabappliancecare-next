"use client";
import React from "react";
import { useState } from "react";
import SimpleEditor from "../SidePages/SimpleEditor";

const Section7 = ({ FetchedData, UpdateData, SpecialStyles, setOuterData }) => {
  const [data, setData] = useState(FetchedData);
  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    if (name === "showForm") {
      setData((prev) => ({ ...prev, showForm: !prev.showForm }));
      if (SpecialStyles) {
        setOuterData((prev) => {
          return {
            ...prev,
            Section7: { ...prev.Section7, showForm: !prev.Section7.showForm },
          };
        });
      }
    }
    if (name === "Show") {
      setData((prev) => ({ ...prev, Show: !prev.Show }));
      if (SpecialStyles) {
        setOuterData((prev) => {
          return {
            ...prev,
            Section7: { ...prev.Section7, Show: !prev.Section7.Show },
          };
        });
      }
    }
  };
  const handlePostBodyChange = (value) => {
    setData((prev) => {
      return { ...prev, content: value };
    });
    if (SpecialStyles) {
      setOuterData((prev) => {
        return { ...prev, Section7: { ...prev.Section7, content: value } };
      });
    }
  };
  const handleMainInput = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (SpecialStyles) {
      setOuterData((prev) => {
        return { ...prev, Section7: { ...prev.Section7, content: value } };
      });
    }
  };
  return (
    <div className="DataEntry section7">
      <h3>Section 7</h3>

      <div className="FormItem">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={data.title}
          onChange={handleMainInput}
        />
      </div>
      <div className="formItem form-check CheckBox">
        <label className="form-check-label">
          Show Section:
          <input
            className="form-check-input"
            type="checkbox"
            checked={data.Show}
            name="Show"
            onChange={handleCheckboxChange}
          />
        </label>
      </div>

      <SimpleEditor
        handlePostBodyChange={handlePostBodyChange}
        toolBarID={"ToolBar02"}
        oldValue={data.content}
        PreviewClassName="ViewTemplate"
      />
      <h4>Form settings</h4>
      <div className="formItem form-check CheckBox">
        <label className="form-check-label">
          Show form:
          <input
            className="form-check-input"
            type="checkbox"
            name="showForm"
            checked={data.showForm}
            onChange={handleCheckboxChange}
          />
        </label>
      </div>
      <div className="FormItem">
        <label htmlFor="formHeader">form Header:</label>
        <input
          type="text"
          id="formHeader"
          name="formHeader"
          value={data.formHeader}
          onChange={handleMainInput}
        />
      </div>
      <div className="FormItem">
        <label htmlFor="formButtonText">form button text:</label>
        <input
          type="text"
          id="formButtonText"
          name="formButtonText"
          value={data.formButtonText}
          onChange={handleMainInput}
        />
      </div>

      {!SpecialStyles && (
        <button
          className="Button View"
          id="Submit"
          onClick={() => {
            UpdateData("Section7", data);
          }}
        >
          Save
        </button>
      )}
    </div>
  );
};

export default Section7;
