"use client";
import React, { useEffect, useState } from "react";
import GETDOC from "@/lib/getDoc";
import decrypt from "@/lib/decrypt";
import NotFound from "@/app/not-found";
import "./UserDetails.css";
import Image from "next/image";
const UserDetails = ({ params }) => {
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
  const [user, setUser] = React.useState(null);
  const [Error, setError] = React.useState(false);

  const id = params.User;
  function timeSince(dateString) {
    const dateParts = dateString.split("/");
    const year = parseInt(dateParts[2], 10) + 2000; // add 2000 to two-digit year
    const month = parseInt(dateParts[1], 10) - 1; // subtract 1 from month (0-indexed)
    const day = parseInt(dateParts[0], 10);

    const date = new Date(year, month, day);
    const seconds = Math.floor((new Date() - date) / 1000);

    if (seconds < 60) {
      return seconds + " second" + (seconds === 1 ? "" : "s") + " ago";
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return minutes + " minute" + (minutes === 1 ? "" : "s") + " ago";
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return hours + " hour" + (hours === 1 ? "" : "s") + " ago";
    }

    const days = Math.floor(hours / 24);
    return days + " day" + (days === 1 ? "" : "s") + " ago";
  }
  useEffect(() => {
    const checkData = async () => {
      let fetchedData = {};
      GETDOC("users", ActiveUser).then((res) => {
        fetchedData = res;
        setActiveUser(res);
      });
    };
    ActiveUser && checkData();
  }, []);
  useEffect(() => {
    const fetchUser = async () => {
      await GETDOC("users", id).then((res) =>
        res !== "Error" ? setUser(res) : setError(true)
      );
    };
    fetchUser();
  }, []);

  return (
    <div className="ViewUser">
      {!ActiveUser ? (
        <NotFound />
      ) : ActiveUser.Role === "User" || ActiveUser.Role === "Author" ? (
        <NotFound />
      ) : Error ? (
        <NotFound />
      ) : (
        user && (
          <>
            <h3 className="animate__animated animate__fast  animate__fadeInLeft">
              {user.Fname} {user.Lname}'s profile
            </h3>
            <div className="Content">
              <div className="Left animate__animated animate__fast  animate__fadeInDown">
                <p className="UserName animate__animated animate__fast  animate__backInDown">
                  {user.Username}
                </p>
                <span
                  className="Email animate__animated animate__fast  animate__backInDown"
                  style={{ animationDelay: ".3s" }}
                >
                  {user.email}
                </span>
              </div>
              <div className="Right">
                <div className="Card-wrapper">
                  <div className="Card animate__animated animate__fast  animate__fadeInLeft">
                    <div className="header">
                      <p className="CardTitle">Phone Number</p>
                      <Image
                        src="/phone.png"
                        alt="phone"
                        width="25"
                        height="25"
                      ></Image>
                    </div>
                    <p className="CardInfo">
                      {user.phone ? user.phone : "UNSET"}
                    </p>
                  </div>
                  <div
                    className="Card animate__animated animate__fast  animate__fadeInRight"
                    style={{ animationDelay: ".4s" }}
                  >
                    <div className="header">
                      <p className="CardTitle">Date Joined</p>
                      <Image
                        src="/calendar.png"
                        alt="calender"
                        width="25"
                        height="25"
                      ></Image>
                    </div>
                    <p className="CardInfo">{user.joinedAt}</p>
                    <span className="SubText">{timeSince(user.joinedAt)}</span>
                  </div>
                  <div
                    className="Card animate__animated animate__fast  animate__fadeInLeft"
                    style={{ animationDelay: ".5s" }}
                  >
                    <div className="header">
                      <p className="CardTitle">Gender</p>
                      <Image
                        src="/gender.png"
                        alt="gender"
                        width="25"
                        height="25"
                      ></Image>
                    </div>
                    <p className="CardInfo">
                      {user.gender ? user.gender : "UNSET"}
                    </p>
                  </div>
                  <div
                    className="Card animate__animated animate__fast  animate__fadeInRight"
                    style={{ animationDelay: ".6s" }}
                  >
                    <div className="header">
                      <p className="CardTitle">Date of Birth</p>
                      <Image
                        src="/calendar.png"
                        alt="calender"
                        width="25"
                        height="25"
                      ></Image>
                    </div>
                    <p className="CardInfo">
                      {user.dateOfBirth ? user.dateOfBirth : "UNSET"}
                    </p>
                  </div>
                  <div
                    className="Card animate__animated animate__fast  animate__fadeInLeft"
                    style={{ animationDelay: ".7s" }}
                  >
                    <div className="header">
                      <p className="CardTitle">Address</p>
                      <Image
                        src="/address.png"
                        alt="address"
                        width="25"
                        height="25"
                      ></Image>
                    </div>
                    <p className="CardInfo">
                      {user.address ? user.address : "UNSET"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default UserDetails;
