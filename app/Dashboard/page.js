"use client";
import React, { useEffect, useState } from "react";
import CreateToast from "@/lib/createToast";
import GETDOC from "@/lib/getDoc";
import decrypt from "@/lib/decrypt";
import GETCOLLECTION from "@/lib/getCollection";
import SETDOC from "@/lib/setDoc";
import "./Dashboard.css";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "../not-found";
import Users from "./Users/Users";
import DropDowns from "./DropDowns/DropDowns";
import encrypt from "@/lib/encrypt";
import WebSettings from "./Customization/WebSettings";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("Users");
  const [expanded, setExpanded] = useState(false);
  const [customizationPage, setCustomizationPage] = useState("Nav1");
  const [ActiveUser, setActiveUser] = useState(null);

  useEffect(() => {
    const signedIn = JSON.parse(sessionStorage.getItem("activeUser"))?.id;

    if (signedIn) {
      setActiveUser(
        decrypt(JSON.parse(sessionStorage.getItem("activeUser"))?.id)
      );
    } else {
      setActiveUser(null);
    }
  }, []);
  const [width, setWidth] = useState(900);
  function handleWindowSizeChange() {
    setWidth(typeof window !== "undefined" ? window.innerWidth : 0);
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleWindowSizeChange);
      return () => {
        window.removeEventListener("resize", handleWindowSizeChange);
      };
    }
  }, []);

  const CheckInfo = (res) => {
    const vals = Object.keys(res).map(function (key) {
      return res[key];
    });
    for (let index = 0; index < vals.length; index++) {
      if (typeof vals[index] !== "boolean") {
        if (typeof vals[index] !== "object")
          if (vals[index] !== 0) {
            if (!vals[index]) {
              CreateToast(
                `your Profile is incomplete! go to ${
                  res.admin ? "Admin Profile" : "settings"
                } to complete it`,
                "warning"
              );
              return;
            }
          }
      }
    }
  };
  useEffect(() => {
    const checkData = async () => {
      const signedIn = JSON.parse(sessionStorage.getItem("activeUser"))?.id;

      if (signedIn) {
        let fetchedData = {};
        GETDOC(
          "users",
          decrypt(JSON.parse(sessionStorage.getItem("activeUser"))?.id)
        ).then((res) => {
          fetchedData = res;
          setActiveUser(res);
          CheckInfo(fetchedData);
        });
      } else {
        setActiveUser(null);
      }
    };
    checkData();
  }, []);
  const logOut = async () => {
    CreateToast("logging out..");
    let cleanData = [];
    await GETCOLLECTION("users").then((response) => {
      cleanData = response;
    });
    cleanData.forEach(async (User) => {
      if (User.id === ActiveUser.id) {
        User.Active = false;
      }
      await SETDOC("users", User.id, { ...User });
      sessionStorage.clear();
      window.location.href = "/";
    });
  };
  useEffect(() => {
    const fetchColors = async () => {
      const webData = await GETDOC("customization", "Website");
      const root = document.documentElement;
      root.style.setProperty("--buttons", webData.Colors.ButtonColors);
      root.style.setProperty("--text", webData.Colors.Text);
      root.style.setProperty("--borders", webData.Colors.Borders);
      root.style.setProperty("--Lines", webData.Colors.Lines);
      root.style.setProperty("--HoverText", webData.Colors.HoverText);
      root.style.setProperty("--LinkLines", webData.Colors.LinkLines);
    };
    fetchColors();
  }, []);
  return (
    <div className="Dashboard">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {width < 800 ? (
        <h1 className="Reject">
          Sorry you must be on a larger screen to view this page
        </h1>
      ) : ActiveUser ? (
        <>
          {ActiveUser.Role === "Admin" || ActiveUser.Role === "Owner" ? (
            <>
              <div className={`${expanded ? "Expanded" : ""} SideBar`}>
                <h3 className="Greet">
                  <span
                    className=" animate__animated animate__fast animate__fadeInUp"
                    style={{ animationDelay: ".3s" }}
                  >
                    {ActiveUser.Username}
                  </span>
                </h3>
                <div className="BtnWrapper">
                  <ul className="BTNList">
                    <li
                      onClick={() => {
                        setActivePage("Users");
                      }}
                      style={{ animationDelay: ".4s" }}
                      className="animate__animated animate__fast animate__fadeInLeft"
                    >
                      {expanded ? (
                        <span
                          className={`${
                            activePage === "Users" ? "focus" : ""
                          } Link`}
                        >
                          -Users
                        </span>
                      ) : (
                        <Image
                          src="/Users.png"
                          className={`${
                            activePage === "Users" ? "focus" : ""
                          } Icon`}
                          alt="users"
                          width="23"
                          height="23"
                        />
                      )}
                    </li>

                    <li
                      onClick={() => {
                        window.location.href = `/Portal/${encrypt(
                          ActiveUser.id
                        )}/settings`;
                      }}
                      style={{ animationDelay: ".8s" }}
                      className="animate__animated animate__fast animate__fadeInLeft"
                    >
                      {expanded ? (
                        <span
                          className={`${
                            activePage === "Profile" ? "focus" : ""
                          } Link`}
                        >
                          -Admin Profile
                        </span>
                      ) : (
                        <Image
                          src="/user.png"
                          className={`${
                            activePage === "Profile" ? "focus" : ""
                          } Icon`}
                          alt="Profile"
                          width="23"
                          height="23"
                        />
                      )}
                    </li>

                    <li
                      onClick={() => {
                        setActivePage("Dropdowns");
                      }}
                      style={{ animationDelay: ".9s" }}
                      className="animate__animated animate__fast animate__fadeInLeft"
                    >
                      {expanded ? (
                        <span
                          className={`Link ${
                            activePage === "Dropdowns" ? "focus" : ""
                          }`}
                        >
                          -Dropdowns
                        </span>
                      ) : (
                        <Image
                          src="/Dropdowns.png"
                          className={`Icon ${
                            activePage === "Dropdowns" ? "focus" : ""
                          }`}
                          alt="Dropdowns"
                          width="23"
                          height="23"
                        />
                      )}
                    </li>

                    <li
                      onClick={() => {
                        setActivePage("Customization");
                      }}
                      style={{ animationDelay: ".9s" }}
                      className="animate__animated animate__fast animate__fadeInLeft"
                    >
                      {expanded ? (
                        <span
                          className={`Link ${
                            activePage === "Customization" ? "focus" : ""
                          }`}
                        >
                          -Customization
                        </span>
                      ) : (
                        <Image
                          src="/customization.png"
                          className={`Icon ${
                            activePage === "Customization" ? "focus" : ""
                          }`}
                          alt="customization"
                          width="23"
                          height="23"
                        />
                      )}
                    </li>

                    <li
                      onClick={logOut}
                      style={{ animationDelay: "1s", marginTop: "auto" }}
                      className={`animate__animated animate__fast animate__fadeInLeft`}
                    >
                      {expanded ? (
                        <span className="Link">-Logout</span>
                      ) : (
                        <Image
                          src="/logout.png"
                          className="Icon"
                          alt="logout"
                          width="23"
                          height="23"
                        />
                      )}
                    </li>
                  </ul>

                  <Image
                    onClick={() => {
                      setExpanded((prev) => !prev);
                    }}
                    className={`animate__animated animate__fast animate__fadeInLeft`}
                    style={{
                      margin: "auto 0",
                      width: "25px",
                      cursor: "pointer",
                      animationDelay: "1.1s",
                      height: "auto",
                    }}
                    alt={expanded ? "Shrink" : "Expand"}
                    width="23"
                    height="23"
                    src={expanded ? "/Shrink.png" : "/Expand.png"}
                  />
                </div>
              </div>
              <div className="Page">
                {activePage === "Users" && <Users />}
                {activePage === "Customization" && (
                  <WebSettings
                    customizationPage={customizationPage}
                    SetCustomizationPage={setCustomizationPage}
                  />
                )}

                {activePage === "Dropdowns" && (
                  <DropDowns
                    setActivePageDash={setActivePage}
                    SetCustomizationPage={setCustomizationPage}
                  />
                )}
              </div>
            </>
          ) : (
            <NotFound />
          )}
        </>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Dashboard;
