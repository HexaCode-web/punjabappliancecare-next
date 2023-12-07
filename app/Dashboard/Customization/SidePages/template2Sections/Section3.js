"use client";
import React, { useEffect, useState } from "react";
import SimpleEditor from "../SimpleEditor";
import DataTable from "react-data-table-component";

import sortBy from "sort-by";

import MyModal from "@/app/components/PopUps/Confirm/Confirm";
const Section3 = ({ data, handleInput, handlePostBodyChange, setData }) => {
  const [newCard, setNewCard] = useState({
    text: "",
    id: "",
  });

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handlePrimaryAction = () => {
    setData((prev) => ({
      ...prev,
      section3: {
        ...prev.section3,
        services: [...prev.section3.services, newCard],
      },
    }));
    setNewCard({ text: "", id: "" });
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
      name: "text",
      selector: (row) => <div className="text-wrap">{row.text}</div>,
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
    const Newservices = data.section3.services.filter((Card) => {
      return Card.id !== id;
    });

    setData((prev) => ({
      ...prev,
      section3: {
        ...prev.section3,
        services: Newservices,
      },
    }));
  };

  const servicesData = data.section3.services.map((Card) => {
    const handleChange = (e) => {
      const { name, value } = e.target;
      let oldData = data.section3;
      let newData = oldData.services.map((oldCard) => {
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
        section3: { ...prev.section3, services: newData },
      }));
    };
    return {
      id: Card.id,

      text: (
        <textarea
          style={{ minWidth: "500px" }}
          name="text"
          onChange={handleChange}
          value={Card.text}
        />
      ),
      Options: (
        <button
          className="Button Danger"
          onClick={() => {
            DeleteCard(Card.id);
          }}
        >
          Delete
        </button>
      ),
    };
  });

  useEffect(() => {
    let id;
    if (data.section3.services.length === 0) {
      id = 1;
    } else {
      data.section3.services.sort(sortBy("id"));
      data.section3.services.forEach((Card) => {
        id = (+Card.id + 1).toString();
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
          </>
        </MyModal>
      )}
      <h4>Third Section:</h4>
      <div className="FormItem">
        <label htmlFor="HeaderTitle">Section Title:</label>
        <input
          type="text"
          id="HeaderTitle"
          name="title"
          value={data.section3.title}
          onChange={(e) => {
            handleInput(e, "Section3");
          }}
        />
      </div>
      <SimpleEditor
        handlePostBodyChange={(html) => {
          handlePostBodyChange("Section3", html);
        }}
        toolBarID={"Section3"}
        oldValue={data.section3.content}
        PreviewClassName="ViewTemplate"
      />
      <button
        className="Button Add"
        style={{ margin: "0px 20px" }}
        onClick={handleShowModal}
      >
        Add Card
      </button>
      <DataTable
        className="Table animate__animated animate__fast animate__fadeIn"
        style={{ animationDelay: ".4s" }}
        theme="light"
        highlightOnHover
        columns={dataColumns}
        data={servicesData}
      />
    </section>
  );
};

export default Section3;
