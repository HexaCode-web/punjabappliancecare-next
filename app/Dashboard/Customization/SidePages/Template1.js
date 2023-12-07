import React, { useState } from "react";
import CreateToast from "@/lib/createToast";
import UPLOADPHOTO from "@/lib/uploadPhoto";
import SimpleEditor from "./SimpleEditor";
import Image from "next/image";

import "./SidePages.css";
const Template1 = ({ Data, UpdateData, BackEndName }) => {
  const [data, setData] = useState(Data);
  const [photoUploading, setPhotoUploading] = useState(false);
  const handleInput = async (e) => {
    const { name, value } = e.target;

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
  const handlePostBodyChange = (value) => {
    setData((prev) => {
      return { ...prev, Content: value };
    });
  };
  return (
    <div className="DataEntry Template">
      <div className="formItem" id="ImageUpload">
        <span>Background:</span>
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
        <label htmlFor="HeaderTitle">Header Title:</label>
        <input
          type="text"
          id="HeaderTitle"
          name="HeaderTitle"
          value={data.HeaderTitle}
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
      <SimpleEditor
        handlePostBodyChange={handlePostBodyChange}
        toolBarID={"ToolBar50"}
        oldValue={data.Content}
        PreviewClassName="ViewTemplate"
      />
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

export default Template1;
