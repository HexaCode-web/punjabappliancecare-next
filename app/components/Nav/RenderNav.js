"use client";
import React, { useEffect, useState } from "react";
import ContactPopUp from "../PopUps/ContactPopup/ContactPopup";
import HamburgerButton from "../HamburgerButton/HamburgerButton";
import sortBy from "sort-by";
import GETCOLLECTION from "@/lib/getCollection";
import Link from "next/link";

const RenderNav = ({ Tabs }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [nonList, setNonList] = useState([]);
  const [dropDowns, setDropDowns] = useState([]);
  const [TabsAR, setTabsAR] = useState([]);
  const [urlFormatted, setUrlFormatted] = useState("");
  const [ActivePage, setActivePage] = React.useState(null);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrlFormatted(
        window.location.href.split("/").pop().replace(/%20/g, " ")
      );

      // Check screen width and set isMobile accordingly
      if (window.innerWidth < 800) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }

      // Add an event listener to check the screen width when the window is resized
      const handleResize = () => {
        if (window.innerWidth < 800) {
          setIsMobile(true);
        } else {
          setIsMobile(false);
        }
      };
      window.addEventListener("resize", handleResize);

      // Cleanup the event listener when the component unmounts
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    if (Tabs) {
      let ArPages = [];
      let TempNon = [];

      for (const key in Tabs) {
        if (Object.hasOwnProperty.call(Tabs, key)) {
          const element = Tabs[key];
          ArPages.push({
            Name: key,
            PageName: element.PageName,
            PageURL: element.PageURL,
            DropDownFamily: element.DropDownFamily,
            id: element.id,
          });
        }
      }
      setTabsAR(ArPages);
      TempNon = ArPages.filter((Page) => {
        return Page.DropDownFamily === "0";
      });
      setNonList(TempNon.sort(sortBy("id")));
    }
  }, [Tabs]);

  const RenderNonList = nonList?.map((link) => {
    if (dropDowns[0] === undefined) {
      return;
    }
    let shouldRender = true;
    dropDowns[0].HiddenPages.forEach((Page) => {
      if (Page == link.id) {
        shouldRender = false;
      }
    });
    if (shouldRender && link.PageURL) {
      return (
        <li key={link.id}>
          <Link
            className={urlFormatted === link ? "ActiveLink" : ""}
            href={`/${link.PageURL}`}
          >
            {link.PageName}
          </Link>
        </li>
      );
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      setDropDowns(await GETCOLLECTION("DropDown"));
    };
    fetchData();
  }, []);

  const Render = dropDowns.map((DropDown) => {
    if (DropDown.id == "0") {
      return;
    }
    const TabsToRender = DropDown.Pages.reduce((acc, pageId) => {
      const page = TabsAR.find((item) => item.id === pageId);
      if (page && page.PageURL) {
        acc.push(page);
      }
      return acc;
    }, []);
    return (
      <li key={DropDown.id} className="dropdown">
        <a style={{ cursor: "pointer" }}>
          <span>{DropDown.Name}</span>
        </a>
        <ul>
          {TabsToRender.map((link) => (
            <li key={link.id}>
              <Link
                className={urlFormatted === link ? "ActiveLink" : ""}
                href={`/${link.PageURL}`}
              >
                {link.PageName}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    );
  });

  const toggleMenu = (isOpen) => {
    setIsMenuOpen(isOpen);
  };

  return (
    <>
      {isMobile ? (
        <>
          <HamburgerButton onToggleMenu={toggleMenu} />
          {isMenuOpen && (
            <nav className="SideMenu animate__animated animate__fast animate__fadeInRight">
              <nav id="navbar" className="navbar">
                <ul>
                  <li className={urlFormatted === "" ? "ActiveLink" : ""}>
                    <a href="/">Home</a>
                  </li>

                  {Render}
                  {RenderNonList}

                  <li>
                    <button className="Pricing" onClick={handleShowModal}>
                      Contact Us
                    </button>
                  </li>
                </ul>
              </nav>
            </nav>
          )}
        </>
      ) : (
        <nav id="navbar" className="navbar">
          <ul>
            <li
              className={ActivePage === "" ? "ActiveLink" : ""}
              onClick={() => {
                setActivePage("");
              }}
            >
              <a href="/">Home</a>
            </li>

            {Render}
            {RenderNonList}

            <li>
              <button className="Pricing" onClick={handleShowModal}>
                Contact Us
              </button>
            </li>
          </ul>
        </nav>
      )}
      <ContactPopUp
        show={showModal}
        handleClose={handleCloseModal}
        type="Contact"
      />
    </>
  );
};

export default RenderNav;
