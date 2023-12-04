"use client";
import React, { useEffect, useState } from "react";
import CreateToast from "@/lib/createToast";
import DELETEPHOTO from "@/lib/deletePhoto";
import UPLOADPHOTO from "@/lib/uploadPhoto";
import SimpleEditor from "./SimpleEditor";
import "./SidePages.css";
import sortBy from "sort-by";
import MyModal from "@/app/components/PopUps/Confirm/Confirm";
import DataTable from "react-data-table-component";
import Image from "next/image";
const Template4 = ({ Data, UpdateData, BackEndName }) => {
  const [data, setData] = useState(Data);
  const [photoUploaded, setPhotoUploaded] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [NewCard, setNewCard] = useState({
    url: "",
    id: "",
  });
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handlePrimaryAction = () => {
    if (!photoUploaded) {
      CreateToast("photo uploading please wait", "error");
      return;
    }

    handleCloseModal();
    setData((prev) => {
      return { ...prev, imgList: [...prev.imgList, NewCard] };
    });

    setNewCard({ url: "", id: "" });
    setPhotoUploaded(true);
  };
  const changePhoto = async (e, id) => {
    CreateToast("uploading photo", "info", 2000);
    const Photo = e.target.files[0];
    const url = await UPLOADPHOTO(
      `/customization/MainPage/Section2/${id}.png`,
      Photo
    );

    const newData = data.imgList.map((card) => {
      if (card.id === id) {
        return { ...card, url: url }; // Create a new object with updated URL
      } else {
        return card;
      }
    });

    setData((prev) => {
      return { ...prev, imgList: newData };
    });

    CreateToast("photo uploaded", "success");
    setPhotoUploaded(true);
  };

  const handleInput = async (e) => {
    const { name, value } = e.target;

    if (name === "BG") {
      setPhotoUploaded(false);
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
      setPhotoUploaded(true);

      return;
    } else if (name === "url") {
      CreateToast("uploading photo", "info", 2000);
      const Photo = e.target.files[0];
      const url = await UPLOADPHOTO(
        `/customization/MainPage/Section2/${NewCard.id}.png`,
        Photo
      );
      setNewCard((prev) => {
        return {
          ...prev,
          url: url,
        };
      });
      CreateToast("photo uploaded", "success");
      setPhotoUploaded(true);
      return;
    } else {
      setData((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };

  const DeleteCard = (id) => {
    const NewCards = data.imgList.filter((Card) => {
      return Card.id !== id;
    });
    DELETEPHOTO(`/customization/MainPage/Section2/${id}.png`);
    setData((prev) => {
      return { ...prev, imgList: NewCards };
    });
  };
  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
      center: true,
      width: "150px",
    },
    {
      name: "image",
      selector: (row) => row.url,
      center: true,
    },

    {
      name: "Options",
      selector: (row) => row.Options,
      center: true,
      width: "400px",
    },
  ];
  const TableData = data.imgList.map((Card) => {
    return {
      id: Card.id,
      url: (
        <Image
          src="/upload.png"
          width="25"
          height="25"
          alt="upload"
          style={{ cursor: "pointer", margin: "20px 0" }}
        />
      ),

      Options: (
        <div className="Button-wrapper">
          <button
            className="Button Danger"
            onClick={() => {
              DeleteCard(Card.id);
            }}
          >
            Delete
          </button>
          <div className="FormItem" id="logo">
            <label htmlFor={`Section2CardChange${Card.id}`}>Change Photo</label>
            <input
              type="file"
              hidden
              required
              id={`Section2CardChange${Card.id}`}
              name="url"
              onChange={(e) => {
                changePhoto(e, Card.id);
              }}
            />
          </div>
        </div>
      ),
    };
  });

  useEffect(() => {
    let id;
    data.imgList.sort(sortBy("id"));
    if (data.imgList.length === 0) {
      id = 1;
    } else {
      data.imgList.forEach((img) => {
        id = +img.id + 1;
      });
    }
    setNewCard((prev) => {
      return { ...prev, id };
    });
  }, [data]);
  const handlePostBodyChange = (value) => {
    setData((prev) => {
      return { ...prev, Content: value };
    });
  };
  return (
    <div className="DataEntry Template">
      {showModal && (
        <MyModal
          className="Confirm"
          show={showModal}
          handleClose={handleCloseModal}
          title="Add Card"
          primaryButtonText={`Add`}
          handlePrimaryAction={handlePrimaryAction}
        >
          <>
            <div className="FormItem" id="logo">
              <span>Logo:</span>
              <label htmlFor="Section2Card">
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
                hidden
                required
                id="Section2Card"
                name="url"
                onChange={handleInput}
              />
            </div>
          </>
        </MyModal>
      )}
      <div className="formItem" id="ImageUpload">
        <span>Background:</span>
        <label htmlFor="BG">
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
      <SimpleEditor
        handlePostBodyChange={handlePostBodyChange}
        toolBarID={"ToolBar50"}
        oldValue={data.Content}
        PreviewClassName="ViewTemplate"
      />
      <button
        className="Button Add"
        style={{ margin: "0px auto" }}
        onClick={handleShowModal}
      >
        Add Card
      </button>
      <DataTable
        className="Table animate__animated animate__fast animate__fadeIn"
        style={{ animationDelay: ".4s" }}
        theme="light"
        highlightOnHover
        columns={columns}
        data={TableData}
      />
      <button
        className="Button View"
        id="Submit"
        onClick={() => {
          if (!photoUploaded) {
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

export default Template4;
