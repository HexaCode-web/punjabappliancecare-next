"use client";
import React, { useState, useEffect } from "react";
import CreateToast from "@/lib/createToast";
import UPLOADPHOTO from "@/lib/uploadPhoto";
import "./SidePages.css";

import Section1 from "./template2Sections/Section1";
import FAQ from "./template2Sections/FAQ";
import Section2 from "./template2Sections/Section2";
import Section3 from "./template2Sections/Section3";
import Section4 from "./template2Sections/Section4";
import Section5 from "./template2Sections/Section5";
import Section7 from "./template2Sections/Section7";
import Image from "next/image";

const Template2 = ({ Data, UpdateData, BackEndName }) => {
  const [data, setData] = useState(Data);
  const [photoUploading, setPhotoUploading] = useState(false);

  const handleInput = async (e, Section) => {
    const { name, value } = e.target;
    if (Section) {
      switch (Section) {
        case "Section1":
          setData((prev) => ({
            ...prev,
            section1: {
              ...prev.section1,
              [name]: value,
            },
          }));
          break;
        case "Section2":
          setData((prev) => ({
            ...prev,
            section2: {
              ...prev.section2,
              [name]: value,
            },
          }));
          break;
        case "Section3":
          setData((prev) => ({
            ...prev,
            section3: {
              ...prev.section3,
              [name]: value,
            },
          }));
          break;
        case "Section5":
          setData((prev) => ({
            ...prev,
            section5: {
              ...prev.section5,
              [name]: value,
            },
          }));
          break;
        case "Section4":
          setData((prev) => ({
            ...prev,
            section4: {
              ...prev.section4,
              [name]: value,
            },
          }));
          break;
        case "Section7":
          setData((prev) => ({
            ...prev,
            section7: {
              ...prev.section7,
              [name]: value,
            },
          }));
          break;

        default:
          break;
      }
    }
    if (name === "BG") {
      setPhotoUploading(true);
      CreateToast("uploading photo", "info", 2000);

      const Photo = e.target.files[0];
      const url = await UPLOADPHOTO(
        `/customization/SidePages/${BackEndName}/BG.jpg`,
        Photo
      );
      setData((prev) => {
        return { ...prev, BG: url };
      });
      CreateToast("photo uploaded", "success", 2000);
      setPhotoUploading(false);

      return;
    } else {
      setData((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };
  const handlePostBodyChange = (Primary, value) => {
    switch (Primary) {
      case "Section1":
        setData((prev) => ({
          ...prev,
          section1: {
            ...prev.section1,
            content: value,
          },
        }));
        break;
      case "Section2":
        setData((prev) => ({
          ...prev,
          section2: {
            ...prev.section2,
            content: value,
          },
        }));
        break;
      case "Section3":
        setData((prev) => ({
          ...prev,
          section3: {
            ...prev.section3,
            content: value,
          },
        }));
        break;
      case "Section4":
        setData((prev) => ({
          ...prev,
          section4: {
            ...prev.section4,
            content: value,
          },
        }));
        break;
      case "Section5":
        setData((prev) => ({
          ...prev,
          section5: {
            ...prev.section5,
            content: value,
          },
        }));
        break;
      case "Section7":
        setData((prev) => ({
          ...prev,
          section7: {
            ...prev.section7,
            content: value,
          },
        }));
        break;

      default:
        break;
    }
  };
  return (
    <div className="DataEntry Template">
      <h4>Media</h4>

      <div className="formItem" id="ImageUpload">
        <span>Primary Photo: </span>
        <label htmlFor="BG">
          <Image
            src="/upload.png"
            width="25"
            height="25"
            alt="upload"
            style={{ cursor: "pointer" }}
          />
        </label>
        <input
          type="file"
          accept="image/*"
          hidden
          id="BG"
          name="BG"
          onChange={handleInput}
        />
      </div>

      <h4>General</h4>

      <span style={{ margin: "20px" }}>
        to hide a page just leave the <strong>Page URL</strong> field empty
      </span>
      <div className="FormItem" id="PageURL">
        <label htmlFor="PageURL">Page URL:</label>
        <input
          type="text"
          id="PageURL"
          name="PageURL"
          value={data.PageURL}
          onChange={handleInput}
        />
      </div>
      <div className="FormItem" id="PageName">
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
      <h4>Header Data</h4>

      <div className="FormItem" id="Title">
        <label htmlFor="HeaderTitle">Header Title:</label>
        <input
          type="text"
          id="HeaderTitle"
          name="HeaderTitle"
          value={data.HeaderTitle}
          onChange={handleInput}
        />
      </div>
      <div className="FormItem" id="Title">
        <label htmlFor="HeaderTitle">Header SubTitle:</label>
        <input
          type="text"
          id="HeaderTitle"
          name="headerSubTitle"
          value={data.headerSubTitle}
          onChange={handleInput}
        />
      </div>
      <h4>Meta Data</h4>
      <div className="FormItem" id="Title">
        <label htmlFor="HeaderTitle">Meta Title:</label>
        <input
          type="text"
          id="HeaderTitle"
          name="metaTitle"
          value={data.metaTitle}
          onChange={handleInput}
        />
      </div>
      <div className="FormItem" id="Title">
        <label htmlFor="HeaderTitle">Meta Description:</label>
        <input
          type="text"
          id="HeaderTitle"
          name="metaDescription"
          value={data.metaDescription}
          onChange={handleInput}
        />
      </div>
      <Section1
        data={data}
        handleInput={handleInput}
        handlePostBodyChange={handlePostBodyChange}
      />
      <Section2
        data={data}
        handleInput={handleInput}
        handlePostBodyChange={handlePostBodyChange}
        setData={setData}
        BackEndName={BackEndName}
      />
      <Section3
        data={data}
        handleInput={handleInput}
        handlePostBodyChange={handlePostBodyChange}
        setData={setData}
        BackEndName={BackEndName}
      />
      <Section4
        data={data}
        handleInput={handleInput}
        handlePostBodyChange={handlePostBodyChange}
        BackEndName={BackEndName}
        setData={setData}
      />
      <Section5
        data={data}
        handleInput={handleInput}
        handlePostBodyChange={handlePostBodyChange}
      />
      <Section7
        data={data}
        handleInput={handleInput}
        handlePostBodyChange={handlePostBodyChange}
        setData={setData}
        BackEndName={BackEndName}
      />
      <FAQ data={data} handleInput={handleInput} setData={setData} />

      <button
        className="Button View"
        id="Submit"
        onClick={() => {
          if (photoUploading) {
            CreateToast("uploading Photo,please wait...", "error", 2000);
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

export default Template2;
