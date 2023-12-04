"use client";
import React, { useState } from "react";
import CreateToast from "@/lib/createToast";
import "./SidePages.css";
import Section1 from "../MainPageSettings/Section1";
import Section2 from "../MainPageSettings/Section2";
import Section3 from "../MainPageSettings/Section3";
import Section4 from "../MainPageSettings/Section4";
import Section5 from "../MainPageSettings/Section5";
import Section6 from "../MainPageSettings/Section6";
import Section7 from "../MainPageSettings/Section7";
import Section8 from "../MainPageSettings/Section8";
import Section9 from "../MainPageSettings/Section9";
import HeaderSettings from "../MainPageSettings/HeaderSettings";

const Template3 = ({ Data, UpdateData, BackEndName }) => {
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState(Data);
  const updateData = async (ChangedValue, NewValue) => {
    if (saving) {
      CreateToast("saving previous section please wait", "error", 1000);
      return;
    }
    setSaving(true);
    const DataToSend = { ...data, [ChangedValue]: NewValue };
    setData(DataToSend);
    await UpdateData(BackEndName, DataToSend);
    setSaving(false);
  };
  const handleInput = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return (
    <div className="DataEntry Template">
      <span style={{ color: "red", margin: "0 auto" }}>
        these modifications are only for this location page
      </span>
      <span style={{ margin: "20px" }}>
        to hide a page just leave the <strong>Page URL</strong> field empty
      </span>
      <div className="FormItem" id="Title">
        <label htmlFor="PageURL">Page URL:</label>
        <input
          type="text"
          id="PageURL"
          name="PageURL"
          value={data.PageURL}
          onChange={handleInput}
        />
      </div>
      <div className="FormItem" id="Title">
        <label htmlFor="PageName">Page Name:</label>
        <input
          type="text"
          id="PageName"
          required={true}
          name="PageName"
          value={data.PageName}
          onChange={handleInput}
        />
      </div>
      <div className="FormItem" id="Title">
        <label htmlFor="DesiredLocation">Desired Location:</label>
        <input
          type="text"
          id="DesiredLocation"
          name="DesiredLocation"
          value={data.DesiredLocation}
          onChange={handleInput}
        />
      </div>
      <div className="FormItem" id="callNumber">
        <label htmlFor="callNumber">call Number:</label>
        <input
          type="text"
          id="callNumber"
          required={true}
          name="callNumber"
          value={data.callNumber}
          onChange={handleInput}
        />
      </div>
      <HeaderSettings
        Data={data.Header}
        UpdateData={updateData}
        UploadPath={`/customization/SidePages/${BackEndName}`}
        SpecialStyles={true}
        setOuterData={setData}
      />

      <Section1
        FetchedData={data.Section1}
        UpdateData={updateData}
        SpecialStyles={true}
        setOuterData={setData}
      />
      <Section2
        FetchedData={data.Section2}
        UpdateData={updateData}
        UploadPath={`/customization/SidePages/${BackEndName}`}
        SpecialStyles={true}
        setOuterData={setData}
      />
      <Section3
        FetchedData={data.Section3}
        UpdateData={updateData}
        UploadPath={`/customization/SidePages/${BackEndName}`}
        SpecialStyles={true}
        setOuterData={setData}
      />
      <Section4
        FetchedData={data.Section4}
        UpdateData={updateData}
        SpecialStyles={true}
        setOuterData={setData}
      />
      <Section5
        FetchedData={data.Section5}
        UpdateData={updateData}
        UploadPath={`/customization/SidePages/${BackEndName}`}
        SpecialStyles={true}
        setOuterData={setData}
      />
      <Section6
        FetchedData={data.Section6}
        UpdateData={updateData}
        SpecialStyles={true}
        setOuterData={setData}
      />
      <Section7
        FetchedData={data.Section7}
        UpdateData={updateData}
        SpecialStyles={true}
        setOuterData={setData}
      />
      <Section8
        FetchedData={data.Section8}
        UpdateData={updateData}
        SpecialStyles={true}
        setOuterData={setData}
      />
      <Section9
        FetchedData={data.Section9}
        UpdateData={updateData}
        UploadPath={`/customization/SidePages/${BackEndName}`}
        SpecialStyles={true}
        setOuterData={setData}
      />
      <button
        className="Button View"
        id="Submit"
        onClick={() => {
          if (saving) {
            CreateToast("section saving,please wait...", "error", 2000);
            return;
          }
          UpdateData(BackEndName, data);
        }}
      >
        Save
      </button>
    </div>
  );
};

export default Template3;
