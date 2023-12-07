import React from "react";
import DataTable from "react-data-table-component";
import { useEffect } from "react";
import { useState } from "react";
import sortBy from "sort-by";

import MyModal from "@/app/components/PopUps/Confirm/Confirm";

const FAQ = ({ data, handleInput, setData }) => {
  const [newQuestion, setNewQuestion] = useState({
    A: "",
    Q: "",
    id: "",
  });
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handlePrimaryAction = () => {
    setData((prev) => {
      return { ...prev, FAQ: [...prev.FAQ, newQuestion] };
    });
    setNewQuestion({ A: "", Q: "", id: "" });

    handleCloseModal();
  };

  const FAQcolumns = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
      center: true,
      width: "90px",
    },
    {
      name: "Question",
      selector: (row) => <div className="text-wrap">{row.Question}</div>,
      center: true,
      width: "200px",
    },
    {
      name: "Answer",
      selector: (row) => <div className="text-wrap">{row.Answer}</div>,
      center: true,
    },

    {
      name: "Options",
      selector: (row) => row.Options,
      center: true,
      width: "100px",
    },
  ];
  const DeleteCard = (id) => {
    const NewFAQ = data.FAQ.filter((Question) => {
      return Question.id !== id;
    });

    setData((prev) => {
      return { ...prev, FAQ: NewFAQ };
    });
  };

  const FAQData = data.FAQ.map((Card) => {
    const handleChange = (e) => {
      const { name, value } = e.target;
      let oldData = data.FAQ;
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
      setData((prev) => ({ ...prev, FAQ: newData }));
    };
    return {
      id: Card.id,
      Question: <textarea name="Q" value={Card.Q} onChange={handleChange} />,
      Answer: (
        <textarea
          style={{ minWidth: "500px" }}
          name="A"
          onChange={handleChange}
          value={Card.A}
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
    let idForFAQ;
    if (data.FAQ.length === 0) {
      idForFAQ = 1;
    } else {
      data.FAQ.sort(sortBy("id"));

      data.FAQ.forEach((category) => {
        idForFAQ = +category.id + 1;
      });
    }
    setNewQuestion((prev) => {
      return { ...prev, id: idForFAQ };
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
              <label htmlFor="Q">Question:</label>
              <input
                type="text"
                id="Q"
                name="Q"
                value={newQuestion.Question}
                onChange={(event) => {
                  setNewQuestion((prev) => {
                    return { ...prev, [event.target.name]: event.target.value };
                  });
                }}
              ></input>
            </div>
            <div className="formItem ">
              <label htmlFor="A">Answer:</label>
              <textarea
                id="A"
                name="A"
                value={newQuestion.text}
                onChange={(event) => {
                  setNewQuestion((prev) => {
                    return { ...prev, [event.target.name]: event.target.value };
                  });
                }}
              ></textarea>
            </div>
          </>
        </MyModal>
      )}
      <h4>FAQ Section:</h4>

      <button
        className="Button Add"
        style={{ margin: "0px 20px" }}
        onClick={handleShowModal}
      >
        Add Card
      </button>
      <h4 style={{ margin: "20px" }}>FAQ Table</h4>
      <DataTable
        className="Table animate__animated animate__fast animate__fadeIn"
        style={{ animationDelay: ".4s" }}
        theme="light"
        highlightOnHover
        columns={FAQcolumns}
        data={FAQData}
      />
    </section>
  );
};

export default FAQ;
