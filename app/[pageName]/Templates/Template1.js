"use client";
import React from "react";
import "./Templates.css";
const Template1 = ({ Data }) => {
  return (
    <div
      className="ViewTemplate"
      dangerouslySetInnerHTML={{ __html: Data.Content }}
    ></div>
  );
};

export default Template1;
