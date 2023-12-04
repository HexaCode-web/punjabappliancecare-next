"use client";
import React, { useEffect, useState } from "react";
import SimpleEditor from "../SimpleEditor";
import DataTable from "react-data-table-component";

import sortBy from "sort-by";
import MyModal from "@/app/components/PopUps/Confirm/Confirm";
import CreateToast from "@/lib/createToast";

import UPLOADPHOTO from "@/lib/uploadPhoto";
import Image from "next/image";

const Section2 = ({
  data,
  handleInput,
  handlePostBodyChange,
  setData,
  BackEndName,
}) => {
  const [newCard, setNewCard] = useState({
    title: "",
    text: "",
    image: "",
    id: "",
  });
  const [photoUploading, setPhotoUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handlePrimaryAction = () => {
    if (photoUploading) {
      CreateToast("photo is uploading please wait", "error");
      return;
    }
    setData((prev) => ({
      ...prev,
      section2: {
        ...prev.section2,
        Cards: [...prev.section2.Cards, newCard],
      },
    }));
    setNewCard({ title: "", text: "", id: "", image: "" });
    handleCloseModal();
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
      name: "title",
      selector: (row) => <div className="text-wrap">{row.title}</div>,
      center: true,
    },
    {
      name: "text",
      selector: (row) => <div className="text-wrap">{row.text}</div>,
      center: true,
    },
    {
      name: "image",
      selector: (row) => row.image,
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
    const NewCards = data.section2.Cards.filter((Card) => {
      return Card.id !== id;
    });

    setData((prev) => ({
      ...prev,
      section2: {
        ...prev.section2,
        Cards: NewCards,
      },
    }));
  };

  const cardsData = data.section2.Cards.map((Card) => {
    const handleChange = (e) => {
      const { name, value } = e.target;
      let oldData = data.section2;
      let newData = oldData.Cards.map((oldCard) => {
        if (oldCard.id === Card.id) {
          return {
            ...oldCard,
            [name]: value,
          };
        } else {
          return oldCard;
        }
      });
      setData((prev) => ({
        ...prev,
        section2: { ...prev.section2, Cards: newData },
      }));
    };
    return {
      id: Card.id,
      title: (
        <textarea name="title" value={Card.title} onChange={handleChange} />
      ),
      text: (
        <textarea
          style={{ minWidth: "500px" }}
          name="text"
          onChange={handleChange}
          value={Card.text}
        />
      ),
      image: (
        <Image
          src={Card.image}
          width="170"
          height="170"
          alt={Card.text}
          style={{ cursor: "pointer", margin: "20px", borderRadius: "10px" }}
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
            <label htmlFor={`ChangePhotoSection2${Card.id}`}>
              Change Photo
            </label>
            <input
              type="file"
              hidden
              required
              id={`ChangePhotoSection2${Card.id}`}
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
  const handleSection2Upload = async (e) => {
    setPhotoUploading(true);
    CreateToast("uploading photo", "info", 2000);

    const Photo = e.target.files[0];

    try {
      const url = await UPLOADPHOTO(
        `/customization/SidePages/${BackEndName}/Section2Photos/${newCard.id}.jpg`,
        Photo
      );
      setNewCard((prev) => {
        return { ...prev, image: url };
      });
      CreateToast("photo uploaded", "success", 2000);
    } catch (error) {
      console.error("Error uploading photo:", error);
      CreateToast("photo upload failed", "error", 2000);
    }
    setPhotoUploading(false);
  };
  const changePhoto = async (e, id) => {
    setPhotoUploading(true);

    CreateToast("uploading photo", "info", 2000);
    const Photo = e.target.files[0];
    const url = await UPLOADPHOTO(
      `/customization/MainPage/Section2/${id}.png`,
      Photo
    );

    const newData = data.section2.Cards.map((card) => {
      if (card.id === id) {
        return { ...card, image: url }; // Create a new object with updated URL
      } else {
        return card;
      }
    });

    setData((prev) => ({
      ...prev,
      section2: { ...prev.section2, Cards: newData },
    }));

    CreateToast("photo uploaded", "success");
    setPhotoUploading(false);
  };

  useEffect(() => {
    let id;
    if (data.section2.Cards.length === 0) {
      id = 1;
    } else {
      data.section2.Cards.sort(sortBy("id"));
      data.section2.Cards.forEach((Card) => {
        id = Card.id + 1;
      });
    }
    setNewCard((prev) => {
      return { ...prev, id };
    });
  }, [data]);
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
            <div className="formItem ">
              <label htmlFor="title">title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newCard.title}
                onChange={(event) => {
                  setNewCard((prev) => {
                    return { ...prev, [event.target.name]: event.target.value };
                  });
                }}
              ></input>
            </div>
            <div className="formItem ">
              <label htmlFor="text">text:</label>
              <textarea
                id="text"
                name="text"
                value={newCard.text}
                onChange={(event) => {
                  setNewCard((prev) => {
                    return { ...prev, [event.target.name]: event.target.value };
                  });
                }}
              ></textarea>
            </div>
            <div className="formItem" id="ImageUpload">
              <span>Card Photo: </span>
              <label htmlFor="Section2IMG">
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
                id="Section2IMG"
                name="image"
                onChange={handleSection2Upload}
              />
            </div>
          </>
        </MyModal>
      )}
      <h4>Second Section:</h4>
      <div className="FormItem">
        <label htmlFor="HeaderTitle">Section Title:</label>
        <input
          type="text"
          id="HeaderTitle"
          name="title"
          value={data.section2.title}
          onChange={(e) => {
            handleInput(e, "Section2");
          }}
        />
      </div>
      <SimpleEditor
        handlePostBodyChange={(html) => {
          handlePostBodyChange("Section2", html);
        }}
        toolBarID={"SecondSection"}
        oldValue={data.section2.content}
        PreviewClassName="ViewTemplate"
      />
      <button
        className="Button Add"
        style={{ margin: "0px 20px" }}
        onClick={handleShowModal}
      >
        Add Card
      </button>
      <h4 style={{ margin: "20px" }}>Second Table</h4>
      <DataTable
        className="Table animate__animated animate__fast animate__fadeIn"
        style={{ animationDelay: ".4s" }}
        theme="light"
        highlightOnHover
        columns={dataColumns}
        data={cardsData}
      />
    </section>
  );
};

export default Section2;
