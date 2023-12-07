"use client";
import React from "react";

import "./PageOrder.css";
const PageOrder = ({ FetchedData, UpdateData }) => {
  const [PageOrder, setPageOrder] = React.useState(FetchedData);
  const handleSelectChange = (key, value) => {
    setPageOrder((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const options = [
    "Section1",
    "Section2",
    "Section3",
    "Section4",
    "Section5",
    "Section6",
    "Section7",
    "Section8",
    "Section9",
  ];

  const selects = options.map((key) => {
    const options = [];
    let name = key;

    for (let i = 1; i <= 9; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return (
      <div key={key} className="select-container">
        <h6>{name}</h6>
        <select
          className="styled-select"
          value={PageOrder[key]}
          onChange={(e) => handleSelectChange(key, parseInt(e.target.value))}
        >
          {options}
        </select>
      </div>
    );
  });

  return (
    <section className="PageSort">
      <p>
        Here you can control how your Sections appear on the page, keeping in
        mind that number one is the top of the page after the header.
      </p>
      <span>(any hidden sections will be ignored)</span>
      <div className="Selects-wrapper">{selects}</div>
      <button
        className="Button View"
        onClick={() => {
          UpdateData("PageOrder", PageOrder);
        }}
      >
        Save
      </button>
    </section>
  );
};

export default PageOrder;
