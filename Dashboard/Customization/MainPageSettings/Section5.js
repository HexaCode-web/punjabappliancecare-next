"use client";

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import MyModal from "@/app/components/PopUps/Confirm/Confirm";
import CreateToast from "@/lib/createToast";
import sortBy from "sort-by";
import DELETEPHOTO from "@/lib/deletePhoto";
import UPLOADPHOTO from "@/lib/uploadPhoto";
import Image from "next/image";
const Section5 = ({
  FetchedData,
  UpdateData,
  UploadPath,
  SpecialStyles,
  setOuterData,
}) => {
  const [data, setData] = useState(FetchedData);
  const [photoUploaded, setPhotoUploaded] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [NewCard, setNewCard] = useState({
    URL: "",
    ID: "",
    Name: "",
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
      return { ...prev, Slider: [...prev.Slider, NewCard] };
    });
    if (SpecialStyles) {
      setOuterData((prev) => {
        return {
          ...prev,
          Section5: { ...prev.Section5, Slider: [...prev.Slider, NewCard] },
        };
      });
    }

    setNewCard({ URL: "", ID: "", Name: "" });
    setPhotoUploaded(false);
  };
  const handleMainInput = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (SpecialStyles) {
      setOuterData((prev) => {
        return { ...prev, Section5: { ...prev.Section5, [name]: value } };
      });
    }
  };
  const changePhoto = async (e, id) => {
    CreateToast("uploading photo", "info", 2000);
    const Photo = e.target.files[0];
    const url = await UPLOADPHOTO(
      UploadPath
        ? `${UploadPath}/Section5/${id}.png`
        : `/customization/MainPage/Section5/${id}.png`,
      Photo
    );

    const newData = data.Slider.map((card) => {
      if (card.ID === id) {
        return { ...card, URL: url }; // Create a new object with updated URL
      } else {
        return card;
      }
    });

    setData((prev) => {
      return { ...prev, Slider: newData };
    });
    if (SpecialStyles) {
      setOuterData((prev) => {
        return { ...prev, Section5: { ...prev.Section5, Slider: newData } };
      });
    }
    CreateToast("photo uploaded", "success");
    setPhotoUploaded(true);
  };
  const handleInput = async (e) => {
    const { name, value } = e.target;
    if (name === "url") {
      CreateToast("uploading photo", "info", 2000);
      const Photo = e.target.files[0];
      const url = await UPLOADPHOTO(
        UploadPath
          ? `${UploadPath}/Section5/${NewCard.ID}.png`
          : `/customization/MainPage/Section5/${NewCard.ID}.png`,
        Photo
      );
      setNewCard((prev) => {
        return {
          ...prev,
          URL: url,
        };
      });
      CreateToast("photo uploaded", "success");
      setPhotoUploaded(true);
      return;
    }
    setNewCard((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const DeleteCard = (id) => {
    const NewCards = data.Slider.filter((Card) => {
      return Card.ID !== id;
    });
    DELETEPHOTO(
      UploadPath
        ? `${UploadPath}/Section5/${id}.png`
        : `/customization/MainPage/Section5/${id}.png`
    );
    setData((prev) => {
      return { ...prev, Slider: NewCards };
    });
    if (SpecialStyles) {
      setOuterData((prev) => {
        return { ...prev, Section5: { ...prev.Section5, Slider: NewCards } };
      });
    }
  };
  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
      center: true,
      width: "200px",
    },
    {
      name: "Name",
      selector: (row) => row.Name,
      center: true,
      width: "200px",
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
  const TableData = data.Slider.map((Card) => {
    const handleChange = (e) => {
      const { name, value } = e.target;
      let oldData = data.Slider;
      let newData = oldData.map((oldCard) => {
        if (oldCard.ID === Card.ID) {
          return {
            ...oldCard,
            [name]: value,
          };
        } else {
          return oldCard;
        }
      });
      setData((prev) => ({ ...prev, Slider: newData }));
      if (SpecialStyles) {
        setOuterData((prev) => {
          return { ...prev, Section5: { ...prev.Section5, Slider: newData } };
        });
      }
    };
    return {
      id: Card.ID,
      Name: <input name="Name" value={Card.Name} onChange={handleChange} />,
      url: (
        <Image
          src="/upload.png"
          width="25"
          height="25"
          alt="upload"
          style={{ cursor: "pointer" }}
        />
      ),

      Options: (
        <div className="Button-wrapper">
          <button
            className="Button Danger"
            onClick={() => {
              DeleteCard(Card.ID);
            }}
          >
            Delete
          </button>
          <div className="FormItem" id="logo">
            <label htmlFor={`ChangePhoto${Card.ID}`}>Change Photo</label>
            <input
              type="file"
              hidden
              required
              id={`ChangePhoto${Card.ID}`}
              name="url"
              onChange={(e) => {
                changePhoto(e, Card.ID);
              }}
            />
          </div>
        </div>
      ),
    };
  });

  useEffect(() => {
    let ID;
    data.Slider.sort(sortBy("ID"));
    if (data.Slider.length === 0) {
      ID = 1;
    } else {
      data.Slider.forEach((card) => {
        ID = +card.ID + 1;
      });
    }
    setNewCard((prev) => {
      return { ...prev, ID };
    });
  }, [data]);
  const handleCheckboxChange = () => {
    setData((prev) => ({ ...prev, Show: !prev.Show }));
    if (SpecialStyles) {
      setOuterData((prev) => {
        return {
          ...prev,
          Section5: { ...prev.Section5, Show: !prev.Section5.Show },
        };
      });
    }
  };
  return (
    <div className="DataEntry Section1">
      <h3>Section 5</h3>

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
              <label htmlFor="thumbnailInput">
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
                id="thumbnailInput"
                name="url"
                onChange={handleInput}
              />
            </div>
            <div className="FormItem" id="Name">
              <label htmlFor="title">Name:</label>
              <input
                type="text"
                required
                id="title"
                name="Name"
                value={NewCard.Name}
                onChange={handleInput}
              />
            </div>
          </>
        </MyModal>
      )}
      {!SpecialStyles && (
        <span style={{ color: "red", margin: "0 auto" }}>
          these modifications will reflect on repairs, installations and pages
        </span>
      )}
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
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          required
          id="title"
          name="Title"
          value={data.Title}
          onChange={handleMainInput}
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
          onChange={handleMainInput}
        />
      </div>
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

      {!SpecialStyles && (
        <button
          className="Button View"
          id="Submit"
          onClick={() => {
            UpdateData("Section5", data);
          }}
        >
          Save
        </button>
      )}
    </div>
  );
};

export default Section5;
/*  categories.sort(sortBy("id"));
      categories.forEach((category) => {
        id = +category.id + 1;
      });
      */
