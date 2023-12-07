"use client";
import React from "react";
import SimpleEditor from "../SimpleEditor";
import CreateToast from "@/lib/createToast";

import Image from "next/image";
import UPLOADPHOTO from "@/lib/uploadPhoto";
const Section4 = ({
  data,
  handleInput,
  handlePostBodyChange,
  BackEndName,
  setData,
}) => {
  const handleSection4Upload = async (e) => {
    CreateToast("uploading photo", "info", 2000);

    const Photo = e.target.files[0];
    const url = await UPLOADPHOTO(
      `/customization/SidePages/${BackEndName}/Section4Photos/SecondPicture.jpg`,

      Photo
    );
    setData((prev) => {
      return { ...prev, section4: { ...prev.section4, image: url } };
    });
    CreateToast("photo uploaded", "success", 2000);
  };
  return (
    <section className="SectionWrapper">
      <h4>Fourth Section:</h4>

      <div className="FormItem">
        <label htmlFor="HeaderTitle">Section Title:</label>
        <input
          type="text"
          id="HeaderTitle"
          name="title"
          value={data.section4.title}
          onChange={(e) => {
            handleInput(e, "Section4");
          }}
        />
      </div>
      <div className="formItem" id="ImageUpload">
        <span>section Photo: </span>
        <label htmlFor="Section4IMG">
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
          id="Section4IMG"
          name="image"
          onChange={handleSection4Upload}
        />
      </div>
      <SimpleEditor
        handlePostBodyChange={(html) => {
          handlePostBodyChange("Section4", html);
        }}
        toolBarID={"fourthSection"}
        oldValue={data.section4.content}
        PreviewClassName="ViewTemplate"
      />
    </section>
  );
};

export default Section4;
