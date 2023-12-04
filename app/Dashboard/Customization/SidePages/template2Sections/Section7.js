"use client";
import React, { useEffect, useState } from "react";
import SimpleEditor from "../SimpleEditor";
import DataTable from "react-data-table-component";

import sortBy from "sort-by";

import MyModal from "@/app/components/PopUps/Confirm/Confirm";
import CreateToast from "@/lib/createToast";
import UPLOADPHOTO from "@/lib/uploadPhoto";
import Image from "next/image";

const Section7 = ({
  data,
  handleInput,
  handlePostBodyChange,
  setData,
  BackEndName,
}) => {
  const [newCard, setNewCard] = useState({
    url: "",
    id: "",
  });

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handlePrimaryAction = () => {
    setData((prev) => ({
      ...prev,
      section7: {
        ...prev.section7,
        imgList: [...prev.section7.imgList, newCard],
      },
    }));
    setNewCard({ id: "", url: "" });
    handleCloseModal();
  };
  const changePhoto = async (e, id) => {
    CreateToast("uploading photo", "info", 2000);
    const Photo = e.target.files[0];
    const url = await UPLOADPHOTO(
      `/customization/SidePages/${BackEndName}/Section7Photos/${id}.jpg`,
      Photo
    );

    const newData = data.section7.imgList.map((card) => {
      if (card.id === id) {
        return { ...card, url: url }; // Create a new object with updated URL
      } else {
        return card;
      }
    });

    setData((prev) => ({
      ...prev,
      section7: {
        ...prev.section7,
        imgList: newData,
      },
    }));

    CreateToast("photo uploaded", "success");
  };

  const dataColumns = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
      center: true,
      width: "90px",
    },
    {
      name: "url",
      selector: (row) => row.url,
      center: true,
    },

    {
      name: "Options",
      selector: (row) => row.Options,
      center: true,
      width: "200px",
    },
  ];
  const DeleteCard = (id) => {
    const NewimgList = data.section7.imgList.filter((Card) => {
      return Card.id !== id;
    });

    setData((prev) => ({
      ...prev,
      section7: {
        ...prev.section7,
        imgList: NewimgList,
      },
    }));
  };

  const imgListData = data.section7.imgList.map((Card) => {
    return {
      id: Card.id,
      url: (
        <Image
          src={Card.url}
          width="170"
          height="170"
          alt="card Photo"
          style={{ cursor: "pointer" }}
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
            <label htmlFor={`ChangePhotoSection7${Card.id}`}>
              Change Photo
            </label>
            <input
              type="file"
              hidden
              required
              id={`ChangePhotoSection7${Card.id}`}
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
  const handleIMGInput = async (e) => {
    CreateToast("uploading photo", "info", 2000);

    const Photo = e.target.files[0];
    const url = await UPLOADPHOTO(
      `/customization/SidePages/${BackEndName}/Section7Photos/${newCard.id}.jpg`,
      Photo
    );
    setNewCard((prev) => {
      return { ...prev, url: url };
    });
    CreateToast("photo uploaded", "success", 2000);
  };
  useEffect(() => {
    let id;
    if (data.section7.imgList.length === 0) {
      id = 1;
    } else {
      data.section7.imgList.sort(sortBy("id"));
      data.section7.imgList.forEach((Card) => {
        id = +Card.id + 1;
      });
    }
    setNewCard((prev) => {
      return { ...prev, id };
    });
  }, [data]);
  const handleCheckboxChange = (e) => {
    setData((prev) => ({
      ...prev,
      section7: {
        ...prev.section7,
        Default: !prev.section7.Default,
      },
    }));
  };
  return (
    <section className="SectionWrapper">
      {showModal && (
        <MyModal
          className="Confirm"
          show={showModal}
          handleClose={handleCloseModal}
          Question="add Card"
          primaryButtonText={`add`}
          handlePrimaryAction={handlePrimaryAction}
        >
          <>
            <div className="formItem" id="urlUpload">
              <span>Card Photo: </span>
              <label htmlFor="Section7IMG">
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
                id="Section7IMG"
                name="url"
                onChange={handleIMGInput}
              />
            </div>
          </>
        </MyModal>
      )}
      <h4>Sixth Section:</h4>
      <div className="FormItem">
        <label htmlFor="HeaderTitle">Section Title:</label>
        <input
          type="text"
          id="HeaderTitle"
          name="title"
          value={data.section7.title}
          onChange={(e) => {
            handleInput(e, "Section7");
          }}
        />
      </div>
      <SimpleEditor
        handlePostBodyChange={(html) => {
          handlePostBodyChange("Section7", html);
        }}
        toolBarID={"seventhSection"}
        oldValue={data.section7.content}
        PreviewClassName="ViewTemplate"
      />
      <div className="formItem form-check CheckBox">
        <label className="form-check-label">
          use default brands:
          <input
            className="form-check-input"
            type="checkbox"
            checked={data.section7.Default}
            name="Default"
            onChange={handleCheckboxChange}
          />
        </label>
      </div>
      {data.section7.Default ? (
        <>
          <h3>Default brands are being used</h3>
          <p>
            to edit the default brands please go to LandingPage {">"} Section2
          </p>
        </>
      ) : (
        <>
          <button
            className="Button Add"
            style={{ margin: "0px 20px" }}
            onClick={handleShowModal}
          >
            Add Card
          </button>
          <h4 style={{ margin: "20px" }}>Brands Table</h4>
          <DataTable
            className="Table animate__animated animate__fast animate__fadeIn"
            style={{ animationDelay: ".4s" }}
            theme="light"
            highlightOnHover
            columns={dataColumns}
            data={imgListData}
          />
        </>
      )}
    </section>
  );
};

export default Section7;
