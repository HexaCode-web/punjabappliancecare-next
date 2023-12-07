"use client";

import React, { useState } from "react";
import UPLOADPHOTO from "@/lib/uploadPhoto";
import CreateToast from "@/lib/createToast";
import Image from "next/image";
const Section3 = ({
  FetchedData,
  UpdateData,
  UploadPath,
  SpecialStyles,
  setOuterData,
}) => {
  const [data, setData] = useState(FetchedData);
  const [photoUploaded, setPhotoUploaded] = useState(true);

  const handleInput = async (e) => {
    const { name, value } = e.target;
    if (name === "url") {
      CreateToast("uploading photo", "info", 2000);
      const Photo = e.target.files[0];

      const URL = await UPLOADPHOTO(
        UploadPath
          ? `${UploadPath}/Section3/BG`
          : `/customization/MainPage/Section3/BG`,
        Photo
      );
      setData((prev) => ({ ...prev, URL }));
      if (SpecialStyles) {
        setOuterData((prev) => {
          return { ...prev, Section3: { ...prev.Section3, URL } };
        });
      }

      CreateToast("photo uploaded", "success");
      setPhotoUploaded(true);
      return;
    }
    setData((prev) => {
      return { ...prev, [name]: value };
    });
    if (SpecialStyles) {
      setOuterData((prev) => {
        return { ...prev, Section3: { ...prev.Section3, [name]: value } };
      });
    }
  };
  const handleCheckboxChange = () => {
    setData((prev) => ({ ...prev, Show: !prev.Show }));
    if (SpecialStyles) {
      setOuterData((prev) => {
        return {
          ...prev,
          Section3: { ...prev.Section3, Show: !prev.Section3.Show },
        };
      });
    }
  };
  return (
    <div className="DataEntry section3">
      <h3>Section 3</h3>

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
      <div className="FormItem">
        <span>Section Photo:</span>
        <label htmlFor="Sec3BG">
          <Image
            src="/upload.png"
            width="25"
            height="25"
            alt="upload"
            style={{ cursor: "pointer" }}
          />{" "}
        </label>
        <input
          type="file"
          hidden
          accept="image/*"
          required
          id="Sec3BG"
          name="url"
          onChange={handleInput}
        />
      </div>
      <div className="FormItem" id="Title">
        <label htmlFor="Title">Section Title:</label>
        <input
          type="text"
          required
          id="Title"
          name="title"
          value={data.title}
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
            if (!photoUploaded) {
              CreateToast("photo uploading please wait", "error");
              return;
            }
            UpdateData("Section3", data);
          }}
        >
          Save
        </button>
      )}
    </div>
  );
};

export default Section3;
