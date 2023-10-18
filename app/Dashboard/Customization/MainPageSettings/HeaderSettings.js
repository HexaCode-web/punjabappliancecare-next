/* eslint-disable no-debugger */
"use client";
import React, { useState } from "react";
import CreateToast from "@/lib/createToast";
import UPLOADPHOTO from "@/lib/uploadPhoto";
import UPLOADVIDEO from "@/lib/uploadVideo";
import DELETEPHOTO from "@/lib/deletePhoto";
import "../DataEntry.css";
import VideoPlayer from "../../../components/VideoPlayer/VideoPlayer";
import Image from "next/image";
const HeaderSettings = ({
  Data,
  UpdateData,
  SpecialStyles,
  setOuterData,
  UploadPath,
}) => {
  const [data, setData] = useState(Data);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoUploading, setVideoUploading] = useState(false);
  const [photoUploaded, setPhotoUploaded] = useState(true);

  const handleCheckboxChange = (e) => {
    const { name } = e.target;
    if (SpecialStyles) {
      setOuterData((prev) => {
        return {
          ...prev,
          Header: { ...prev.Header, [name]: !prev.Header[name] },
        };
      });
    }
    setData((prev) => ({ ...prev, [name]: !prev[name] }));
  };
  const handleInput = async (e) => {
    const { name, value } = e.target;
    if (name === "Video") {
      if (videoUploading) {
        CreateToast("uploading Video", "error", 2000);
        return;
      }
      setVideoUploading(true);
      CreateToast("uploading Video", "info", 10000);
      const file = e.target.files[0];
      const url = await UPLOADVIDEO(
        UploadPath
          ? `${UploadPath}/Header/VideoBG`
          : `/customization/MainPage/Header/VideoBG`,
        file,
        handleProgress
      );
      if (SpecialStyles) {
        setOuterData((prev) => {
          return { ...prev, Header: { ...prev.Header, VideoBG: url } };
        });
      }
      setData((prev) => {
        return { ...prev, VideoBG: url };
      });
      setUploadProgress(0);
      CreateToast("Video uploaded", "success", 2000);

      UpdateData("Header", { ...data, VideoBG: url });
      return;
    } else if (name === "BGURL") {
      setPhotoUploaded(false);
      CreateToast("uploading Background", "info");
      const Photo = e.target.files[0];
      const url = await UPLOADPHOTO(
        UploadPath
          ? `${UploadPath}/Header/HeaderBG.jpg`
          : `/customization/MainPage/Header/HeaderBG.jpg`,
        Photo
      );
      if (SpecialStyles) {
        setOuterData((prev) => {
          return { ...prev, Header: { ...prev.Header, BGURL: url } };
        });
      }
      setData((prev) => {
        return {
          ...prev,
          BGURL: url,
        };
      });
      CreateToast("Background uploaded", "success");
      setPhotoUploaded(true);

      return;
    } else {
      setData((prev) => {
        return { ...prev, [name]: value };
      });
      if (SpecialStyles) {
        setOuterData((prev) => {
          return { ...prev, Header: { ...prev.Header, [name]: value } };
        });
      }
    }
  };
  const DeleteVideo = async () => {
    if (videoUploading) {
      CreateToast("Video Uploading, please wait...", "error", 2000);
      return;
    }
    CreateToast("deleting video", "info");
    await DELETEPHOTO(
      UploadPath
        ? `${UploadPath}/Header/VideoBG`
        : `/customization/MainPage/Header/VideoBG`
    );
    await UpdateData("Header", { ...data, VideoBG: "" });
    if (SpecialStyles) {
      setOuterData((prev) => {
        return { ...prev, Header: { ...prev.Header, VideoBG: "" } };
      });
    }
    setData((prev) => ({ ...prev, VideoBG: "" }));
    CreateToast("video deleted", "success");
  };
  const handleProgress = (progress) => {
    setUploadProgress(progress);
    if (progress === 100) {
      setVideoUploading(false);
    }
  };
  const CheckMedia = () => {
    if (photoUploaded === true && videoUploading === false) {
      UpdateData("Header", data);
    } else {
      CreateToast("Media Uploading, please wait...", "error", 2000);
      return;
    }
  };
  return (
    <div className="DataEntry Head">
      <h3>General</h3>
      <div className="FormItem">
        <label htmlFor="Title">Title:</label>
        <input
          type="text"
          required
          id="Title"
          name="Title"
          value={data.Title}
          onChange={handleInput}
          style={{ color: data.TitleColor }}
        />
        <input
          className="ColorPicker"
          type="color"
          value={data.TitleColor}
          name="TitleColor"
          onChange={handleInput}
        />
      </div>
      <div className="FormItem">
        <label htmlFor="SubTitle">Sub Title:</label>
        <textarea
          type="text"
          required
          id="SubTitle"
          name="SubTitle"
          value={data.SubTitle}
          onChange={handleInput}
          style={{ color: data.SubTitleColor }}
        />
        <input
          className="ColorPicker"
          type="color"
          value={data.SubTitleColor}
          name="SubTitleColor"
          onChange={handleInput}
        />
      </div>
      <div className="CheckMarkWrapper">
        <div className="CheckBox">
          <span>Show</span>

          <input
            className="form-check-input"
            type="checkbox"
            checked={data.ShowButton}
            name="ShowButton"
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="FormItem">
          <label htmlFor="buttonText">button Text:</label>
          <input
            type="text"
            required
            id="buttonText"
            name="buttonText"
            value={data.buttonText}
            onChange={handleInput}
          />
          <input
            className="ColorPicker"
            type="color"
            value={data.ButtonTextColor}
            name="ButtonTextColor"
            onChange={handleInput}
          />
        </div>
      </div>
      <div className="CheckMarkWrapper">
        <div className="CheckBox">
          <span>Show</span>

          <input
            className="form-check-input"
            type="checkbox"
            checked={data.ShowContact}
            name="ShowContact"
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="FormItem">
          <label htmlFor="ContactText" style={{ width: "200px" }}>
            Contact Button Text:
          </label>
          <input
            type="text"
            required
            id="ContactText"
            name="ContactText"
            value={data.ContactText}
            onChange={handleInput}
            style={{ color: data.ContactColor }}
          />
          <input
            className="ColorPicker"
            type="color"
            value={data.ContactColor}
            name="ContactColor"
            onChange={handleInput}
          />
        </div>
      </div>
      <h3>Media</h3>
      <div className="UploadWrapper">
        <div className="FormItem">
          <span>Background: </span>
          <label htmlFor="BGURLInput">
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
            id="BGURLInput"
            name="BGURL"
            onChange={handleInput}
          />
        </div>
        <div className="FormItem">
          <span>Video: </span>
          <label htmlFor="Video">
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
            accept="video/*"
            hidden
            id="Video"
            name="Video"
            onChange={handleInput}
          />
        </div>
        <div className="FormItem">
          <span> Show Video:</span>
          <input
            className="form-check-input"
            type="checkbox"
            checked={data.ShowVideo}
            name="ShowVideo"
            onChange={handleCheckboxChange}
          />
        </div>
      </div>

      {uploadProgress != 0 && (
        <div className="video-progress-bar">
          <div
            className="video-progress-bar-fill"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}
      {data.VideoBG && (
        <div style={{ width: "500px" }}>
          <VideoPlayer videoUrl={data.VideoBG} />

          <button className="Button Danger" onClick={DeleteVideo}>
            Delete Video
          </button>
        </div>
      )}

      {SpecialStyles && (
        <>
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
        </>
      )}

      {!SpecialStyles && (
        <button className="Button View" id="Submit" onClick={CheckMedia}>
          Save
        </button>
      )}
    </div>
  );
};

export default HeaderSettings;
