import React, { useEffect, useState } from "react";
import sortBy from "sort-by";
import MyModal from "@/app/components/PopUps/Confirm/Confirm";
import DataTable from "react-data-table-component";

const Section8 = ({ FetchedData, UpdateData, SpecialStyles, setOuterData }) => {
  const [data, setData] = useState(FetchedData);
  const [showModal, setShowModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    A: "",
    Q: "",
    id: "",
  });
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleCheckboxChange = (e) => {
    setData((prev) => ({ ...prev, Show: !prev.Show }));
    if (SpecialStyles) {
      setOuterData((prev) => {
        return {
          ...prev,
          Section8: { ...prev.Section8, Show: !prev.Section8.Show },
        };
      });
    }
  };
  const handleMainInput = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (SpecialStyles) {
      setOuterData((prev) => {
        return { ...prev, Section8: { ...prev.Section8, [name]: value } };
      });
    }
  };

  const handlePrimaryAction = () => {
    setData((prev) => {
      return { ...prev, FAQ: [...prev.FAQ, newQuestion] };
    });
    if (SpecialStyles) {
      setOuterData((prev) => {
        return {
          ...prev,
          Section8: {
            ...prev.Section8,
            FAQ: [...prev.Section8.FAQ, newQuestion],
          },
        };
      });
    }

    setNewQuestion({ A: "", Q: "", id: "" });

    handleCloseModal();
  };

  const FAQcolumns = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
      center: true,
      width: "150px",
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
      width: "200px",
    },
  ];
  const DeleteCard = (id) => {
    const NewFAQ = data.FAQ.filter((Question) => {
      return Question.id !== id;
    });

    setData((prev) => {
      return { ...prev, FAQ: NewFAQ };
    });
    if (SpecialStyles) {
      setOuterData((prev) => {
        return { ...prev, Section8: { ...prev.Section8, FAQ: NewFAQ } };
      });
    }
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
      if (SpecialStyles) {
        setOuterData((prev) => {
          return { ...prev, Section8: { ...prev.Section8, FAQ: newData } };
        });
      }
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
    <div className="DataEntry section7">
      <h3>Section 8</h3>

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
      <div className="FormItem">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={data.title}
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
      <h4 style={{ margin: "20px" }}>FAQ Table</h4>
      <DataTable
        className="Table animate__animated animate__fast animate__fadeIn"
        style={{ animationDelay: ".4s" }}
        theme="light"
        highlightOnHover
        columns={FAQcolumns}
        data={FAQData}
      />

      {!SpecialStyles && (
        <button
          className="Button View"
          id="Submit"
          onClick={() => {
            UpdateData("Section8", data);
          }}
        >
          Save
        </button>
      )}
    </div>
  );
};
export default Section8;
