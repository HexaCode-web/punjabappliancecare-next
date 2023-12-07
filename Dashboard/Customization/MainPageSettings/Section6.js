"use client";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import GETDOC from "@/lib/getDoc";
const Section6 = ({ FetchedData, UpdateData, SpecialStyles, setOuterData }) => {
  const [data, setData] = useState(FetchedData);
  const [pages, setPages] = useState(null);
  useEffect(() => {
    const getPages = async () => {
      const pages = await GETDOC("customization", "Sidepages");
      let locationPages = Object.values(pages).filter((page) => {
        if (page.PageType === "Location") {
          return page;
        }
      });
      setPages(locationPages);
    };
    getPages();
  }, []);
  const handleChange = (e, areaId) => {
    const { name, value } = e.target;
    let oldData = data.Areas;
    let newData = oldData.map((oldCard) => {
      if (oldCard.id === areaId) {
        return {
          ...oldCard,
          [name]: value,
        };
      } else {
        return oldCard;
      }
    });
    setData((prev) => ({ ...prev, Areas: newData }));
    if (SpecialStyles) {
      setOuterData((prev) => {
        return { ...prev, Section6: { ...prev.Section6, Areas: newData } };
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
      name: "Attached Page ID",
      selector: (row) => row.targetPage,
      sortable: true,
      center: true,
      width: "150px",
    },
    {
      name: "Display Name",
      selector: (row) => <div className="text-wrap">{row.Area}</div>,
      center: true,
    },
    {
      name: "Attached Page",
      selector: (row) => row.targetPage,

      cell: (row) => (
        <div className="select-container">
          <select
            className="styled-select"
            value={row.targetPage}
            name="TargetPage"
            onChange={(e) => handleChange(e, row.id)}
          >
            {pages?.map((page) => (
              <option key={page.id} name="TargetPage" value={page.id}>
                {page.PageName}
              </option>
            ))}
          </select>
        </div>
      ),

      center: true,
    },
  ];
  const TableData = data.Areas.map((area) => {
    const handleChange = (e) => {
      const { name, value } = e.target;
      let oldData = data.Areas;
      let newData = oldData.map((oldCard) => {
        if (oldCard.id === area.id) {
          return {
            ...oldCard,
            [name]: value,
          };
        } else {
          return oldCard;
        }
      });
      setData((prev) => ({ ...prev, Areas: newData }));
      if (SpecialStyles) {
        setOuterData((prev) => {
          return { ...prev, Section6: { ...prev.Section6, Areas: newData } };
        });
      }
    };
    return {
      id: area.id,
      Area: <input name="area" value={area.area} onChange={handleChange} />,
      targetPage: area.TargetPage,
    };
  });
  const handleMainInput = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (SpecialStyles) {
      setOuterData((prev) => {
        return { ...prev, Section6: { ...prev.Section6, [name]: value } };
      });
    }
  };

  const handleCheckboxChange = () => {
    setData((prev) => ({ ...prev, Show: !prev.Show }));
    if (SpecialStyles) {
      setOuterData((prev) => {
        return {
          ...prev,
          Section6: { ...prev.Section6, Show: !prev.Section6.Show },
        };
      });
    }
  };
  return (
    <div className="DataEntry section6">
      <h3>Section 6</h3>

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
        <label htmlFor="SubTitle">Paragraph:</label>
        <textarea
          type="text"
          required
          id="SubTitle"
          name="Paragraph"
          value={data.Paragraph}
          onChange={handleMainInput}
        />
      </div>

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
            UpdateData("Section6", data);
          }}
        >
          Save
        </button>
      )}
    </div>
  );
};

export default Section6;
