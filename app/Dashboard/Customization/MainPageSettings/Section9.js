"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import sortBy from "sort-by";
import MyModal from "@/app/components/PopUps/Confirm/Confirm";
import DataTable from "react-data-table-component";
import DELETEPHOTO from "@/lib/deletePhoto";
import UPLOADPHOTO from "@/lib/uploadPhoto";
import CreateToast from "@/lib/createToast";
import Image from "next/image";

const Section9 = ({
  FetchedData,
  UpdateData,
  UploadPath,
  SpecialStyles,
  setOuterData,
}) => {
  const [data, setData] = useState(FetchedData);
  const [showModal, setShowModal] = useState(false);
  const [photoUploaded, setPhotoUploaded] = useState(true);

  const [newCard, setNewCard] = useState({
    description: "",
    firstLink: "",
    firstLinkText: "",
    id: null,
    secondLink: "",
    secondLinkText: "",
    title: "",
    url: "",
  });
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handlePrimaryAction = () => {
    setData((prev) => {
      return { ...prev, Cards: [...prev.Cards, newCard] };
    });
    if (SpecialStyles) {
      setOuterData((prev) => {
        return {
          ...prev,
          Section9: {
            ...prev.Section9,
            Cards: [...prev.Section9.Cards, newCard],
          },
        };
      });
    }

    setNewCard({
      description: "",
      firstLink: "",
      firstLinkText: "",
      id: null,
      secondLink: "",
      secondLinkText: "",
      title: "",
      url: "",
    });
    handleCloseModal();
  };
  const handleCheckboxChange = (e) => {
    setData((prev) => ({ ...prev, Show: !prev.Show }));
    if (SpecialStyles) {
      setOuterData((prev) => {
        return {
          ...prev,
          Section9: { ...prev.Section9, Show: !prev.Section9.Show },
        };
      });
    }
  };
  const handleMainInput = async (e) => {
    const { name, value } = e.target;
    if (name === "url") {
      setPhotoUploaded(false);

      CreateToast("uploading photo", "info", 2000);
      const Photo = e.target.files[0];
      const url = await UPLOADPHOTO(
        UploadPath
          ? `${UploadPath}/Section9/${newCard.id}.png`
          : `/customization/MainPage/Section9/${newCard.id}.png`,
        Photo
      );
      setNewCard((prev) => {
        return {
          ...prev,
          url,
        };
      });
      CreateToast("photo uploaded", "success");
      setPhotoUploaded(true);
      return;
    }
    setData((prev) => ({ ...prev, [name]: value }));
    if (SpecialStyles) {
      setOuterData((prev) => {
        return { ...prev, Section9: { ...prev.Section9, [name]: value } };
      });
    }
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
      name: "description",
      selector: (row) => <div className="text-wrap">{row.description}</div>,
      center: true,
      width: "200px",
    },
    {
      name: "title",
      selector: (row) => <div className="text-wrap">{row.title}</div>,
      center: true,
    },
    {
      name: "First link ",
      selector: (row) => <div className="text-wrap">{row.firstLink}</div>,
      center: true,
    },
    {
      name: "First link text",
      selector: (row) => <div className="text-wrap">{row.firstLinkText}</div>,
      center: true,
    },
    {
      name: "Second link ",
      selector: (row) => <div className="text-wrap">{row.secondLink}</div>,
      center: true,
    },
    {
      name: "Second link Text",
      selector: (row) => <div className="text-wrap">{row.secondLinkText}</div>,
      center: true,
    },
    {
      name: "image",
      selector: (row) => (
        <Image
          src={row.image}
          width="200"
          height="200"
          alt={row.title}
          style={{ cursor: "pointer", borderRadius: "15px", margin: "15px" }}
        />
      ),
      center: true,
    },

    {
      name: "Options",
      selector: (row) => row.Options,
      center: true,
      width: "400px",
    },
  ];
  const DeleteCard = (id) => {
    const NewCards = data.Cards.filter((Card) => {
      return Card.id !== id;
    });
    DELETEPHOTO(
      UploadPath
        ? `${UploadPath}/Section9/${id}.png`
        : `/customization/MainPage/Section9/${id}.png`
    );
    setData((prev) => {
      return { ...prev, Cards: NewCards };
    });
    if (SpecialStyles) {
      setOuterData((prev) => {
        return { ...prev, Section9: { ...prev.Section9, Cards: NewCards } };
      });
    }
  };
  const changePhoto = async (e, id) => {
    CreateToast("uploading photo", "info", 2000);
    setPhotoUploaded(false);

    const Photo = e.target.files[0];
    const url = await UPLOADPHOTO(
      UploadPath
        ? `${UploadPath}/Section9/${id}.png`
        : `/customization/MainPage/Section9/${id}.png`,
      Photo
    );

    const newData = data.Cards.map((card) => {
      if (card.id === id) {
        return { ...card, url: url }; // Create a new object with updated URL
      } else {
        return card;
      }
    });

    setData((prev) => {
      return { ...prev, Cards: newData };
    });
    if (SpecialStyles) {
      setOuterData((prev) => {
        return { ...prev, Section9: { ...prev.Section9, Cards: newData } };
      });
    }
    CreateToast("photo uploaded", "success");
    setPhotoUploaded(true);
  };

  const CardsData = data.Cards.map((Card) => {
    const handleChange = (e) => {
      const { name, value } = e.target;
      let oldData = data.Cards;
      let newData = oldData.map((oldCard) => {
        if (oldCard.id === Card.id) {
          return {
            ...oldCard,
            [name]: value,
          };
        } else {
          return oldCard;
        }
      });
      setData((prev) => ({ ...prev, Cards: newData }));
      if (SpecialStyles) {
        setOuterData((prev) => {
          return { ...prev, Section9: { ...prev.Section9, Cards: newData } };
        });
      }
    };
    return {
      id: Card.id,
      description: (
        <textarea
          name="description"
          value={Card.description}
          onChange={handleChange}
        />
      ),
      title: <input name="title" onChange={handleChange} value={Card.title} />,
      firstLink: (
        <input
          style={{ minWidth: "500px" }}
          name="firstLink"
          onChange={handleChange}
          value={Card.firstLink}
        />
      ),
      firstLinkText: (
        <input
          style={{ minWidth: "500px" }}
          name="firstLinkText"
          onChange={handleChange}
          value={Card.firstLinkText}
        />
      ),
      secondLink: (
        <input
          style={{ minWidth: "500px" }}
          name="secondLink"
          onChange={handleChange}
          value={Card.secondLink}
        />
      ),
      secondLinkText: (
        <input
          style={{ minWidth: "500px" }}
          name="secondLinkText"
          onChange={handleChange}
          value={Card.secondLinkText}
        />
      ),
      image: Card.url,
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
            <label htmlFor={`ChangeSec9Photo${Card.id}`}>Change Photo</label>
            <input
              type="file"
              hidden
              required
              id={`ChangeSec9Photo${Card.id}`}
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
    if (data.Cards.length === 0) {
      id = 1;
    } else {
      data.Cards.sort(sortBy("id"));

      data.Cards.forEach((category) => {
        id = +category.id + 1;
      });
    }
    setNewCard((prev) => {
      return { ...prev, id };
    });
  }, [data]);
  return (
    <div className="DataEntry section9">
      <h3>Section 9</h3>

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
              <label htmlFor="firstLink">first Link:</label>
              <input
                type="text"
                id="firstLink"
                name="firstLink"
                value={newCard.firstLink}
                onChange={(event) => {
                  setNewCard((prev) => {
                    return { ...prev, [event.target.name]: event.target.value };
                  });
                }}
              ></input>
            </div>
            <div className="formItem ">
              <label htmlFor="firstLinkText">first Link Text:</label>
              <input
                type="text"
                id="firstLinkText"
                name="firstLinkText"
                value={newCard.firstLinkText}
                onChange={(event) => {
                  setNewCard((prev) => {
                    return { ...prev, [event.target.name]: event.target.value };
                  });
                }}
              ></input>
            </div>
            <div className="formItem ">
              <label htmlFor="secondLink">second Link:</label>
              <input
                type="text"
                id="secondLink"
                name="secondLink"
                value={newCard.secondLink}
                onChange={(event) => {
                  setNewCard((prev) => {
                    return { ...prev, [event.target.name]: event.target.value };
                  });
                }}
              ></input>
            </div>
            <div className="formItem ">
              <label htmlFor="secondLinkText">second Link Text:</label>
              <input
                type="text"
                id="secondLinkText"
                name="secondLinkText"
                value={newCard.secondLinkText}
                onChange={(event) => {
                  setNewCard((prev) => {
                    return { ...prev, [event.target.name]: event.target.value };
                  });
                }}
              ></input>
            </div>
            <div className="formItem ">
              <label htmlFor="description">description:</label>
              <textarea
                id="description"
                name="description"
                value={newCard.description}
                onChange={(event) => {
                  setNewCard((prev) => {
                    return { ...prev, [event.target.name]: event.target.value };
                  });
                }}
              ></textarea>
            </div>
            <div className="FormItem" id="logo">
              <span>Photo:</span>
              <label htmlFor="url">
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
                id="url"
                name="url"
                onChange={handleMainInput}
              />
            </div>
          </>
        </MyModal>
      )}
      <div className="FormItem">
        <label htmlFor="Title">Title:</label>
        <input
          type="text"
          id="Title"
          name="Title"
          value={data.Title}
          onChange={handleMainInput}
        />
      </div>
      <div className="formItem form-check CheckBox">
        <label className="form-check-label">
          Show Section:
          <input
            className="form-check-input"
            type="checkbox"
            checked={data.Show}
            name="Show"
            onChange={handleCheckboxChange}
          />
        </label>
      </div>
      <button
        className="Button Add"
        style={{ margin: "0px 20px" }}
        onClick={handleShowModal}
      >
        Add Card
      </button>
      <h4 style={{ margin: "20px" }}>Cards Table</h4>
      <p style={{ textAlign: "center", color: "green" }}>
        Ctrl+Scroll wheel to navigate the table
      </p>
      <DataTable
        className="Table animate__animated animate__fast animate__fadeIn"
        style={{ animationDelay: ".4s" }}
        theme="light"
        highlightOnHover
        columns={columns}
        data={CardsData}
      />

      {!SpecialStyles && (
        <button
          className="Button View"
          id="Submit"
          onClick={() => {
            if (photoUploaded) {
              UpdateData("Section9", data);
            } else {
              CreateToast("photo is uploading please wait", "error", 1000);
            }
          }}
        >
          Save
        </button>
      )}
    </div>
  );
};
export default Section9;
