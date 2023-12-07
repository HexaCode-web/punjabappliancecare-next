"use client";
/* eslint-disable no-debugger */
import React, { useState } from "react";

import UPLOADPHOTO from "@/lib/uploadPhoto";
import CreateToast from "@/lib/createToast";
import Image from "next/image";

const General = ({ Data, UpdateGeneralData }) => {
  const [data, setData] = useState(Data);

  const handleInput = async (e) => {
    const { name, value } = e.target;

    if (name === "Logo") {
      CreateToast("uploading photo", "info", 2000);

      const Photo = e.target.files[0];
      const url = await UPLOADPHOTO(`/customization/General/Logo`, Photo);
      setData((prev) => {
        return { ...prev, Logo: url };
      });
      CreateToast("photo uploaded", "success", 2000);

      return;
    } else if (name === "FavIcon") {
      CreateToast("uploading photo", "info", 2000);

      const Photo = e.target.files[0];
      const url = await UPLOADPHOTO(`/customization/General/FavIcon`, Photo);
      setData((prev) => {
        return { ...prev, FavIcon: url };
      });
      CreateToast("photo uploaded", "success", 2000);

      return;
    } else if (name === "Thumbnail") {
      CreateToast("uploading photo", "info", 2000);

      const Photo = e.target.files[0];
      const url = await UPLOADPHOTO(`/customization/General/Thumbnail`, Photo);
      setData((prev) => {
        return { ...prev, Thumbnail: url };
      });
      CreateToast("photo uploaded", "success", 2000);

      return;
    } else {
      setData((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };

  const handleColorChange = (colorName, newColor) => {
    setData((prevData) => ({
      ...prevData,
      Colors: {
        ...prevData.Colors,
        [colorName]: newColor,
      },
    }));
  };
  let RenderColors = Object.entries(data.Colors).map(
    ([colorName, colorValue]) => {
      let nameToRender = "";
      switch (colorName) {
        case "LinkLines":
          nameToRender = "Underline for text";
          break;
        case "ButtonColors":
          nameToRender = "Button Colors";
          break;
        case "HoverText":
          nameToRender = "Text on hover";
          break;
        default:
          nameToRender = colorName;
          break;
      }
      return (
        <li key={colorName}>
          <label>
            {nameToRender}:
            <input
              type="color"
              className="ColorPicker"
              value={colorValue}
              onChange={(e) => handleColorChange(colorName, e.target.value)}
            />
          </label>
        </li>
      );
    }
  );

  return (
    <div className="DataEntry section4">
      <h4>Media</h4>
      <div className="formItem">
        <span>Tab Icon:</span>
        <label htmlFor="FavIcon">
          <Image
            src="/upload.png"
            width="25"
            height="25"
            alt="upload"
            style={{ cursor: "pointer", marginLeft: "20px" }}
          />
        </label>
        <input
          type="file"
          hidden
          id="FavIcon"
          name="FavIcon"
          onChange={handleInput}
        />
      </div>
      <div className="formItem">
        <span>Logo:</span>
        <label htmlFor="Logo">
          <Image
            src="/upload.png"
            width="25"
            height="25"
            alt="upload"
            style={{ cursor: "pointer", marginLeft: "20px" }}
          />
        </label>
        <input
          type="file"
          hidden
          id="Logo"
          name="Logo"
          onChange={handleInput}
        />
      </div>
      <div className="formItem">
        <span>Thumbnail:</span>
        <label htmlFor="Thumbnail">
          <Image
            src="/upload.png"
            width="25"
            height="25"
            alt="upload"
            style={{ cursor: "pointer", marginLeft: "20px" }}
          />
        </label>
        <input
          type="file"
          hidden
          id="Thumbnail"
          name="Thumbnail"
          onChange={handleInput}
        />
      </div>
      <h4>General</h4>

      <span>
        hint: the Email that you will receive the any kind of form submits on
      </span>
      <div className="FormItem" id="Title">
        <label htmlFor="Email">Email:</label>
        <input
          type="email"
          id="Email"
          name="Email"
          value={data.Email}
          onChange={handleInput}
        />
      </div>

      <div className="FormItem" id="Title">
        <label htmlFor="ModalDescription">Contact us Description:</label>
        <input
          type="text"
          id="ModalDescription"
          name="ModalDescription"
          value={data.ModalDescription}
          onChange={handleInput}
        />
      </div>
      <h4>Appearance</h4>

      <span style={{ color: "red" }}>
        Warning: the below changes might effect the search engine results
      </span>
      <div className="FormItem" id="Title">
        <label htmlFor="WebsiteName">Website Name:</label>
        <input
          type="text"
          id="WebsiteName"
          name="WebsiteName"
          value={data.WebsiteName}
          onChange={handleInput}
        />
      </div>
      <div className="FormItem" id="Title">
        <label htmlFor="Description">Website Description:</label>
        <input
          type="text"
          id="Description"
          name="Description"
          value={data.Description}
          onChange={handleInput}
        />
      </div>
      <h4>Website Colors</h4>
      <div className="WebTheme">
        <ul>{RenderColors}</ul>
      </div>
      <button
        className="Button View"
        id="Submit"
        onClick={() => {
          UpdateGeneralData(data);
        }}
      >
        Save
      </button>
    </div>
  );
};

export default General;
