"use client";
import decrypt from "@/lib/decrypt";
import GETCOLLECTION from "@/lib/getCollection";
import SETDOC from "@/lib/setDoc";
import React, { useEffect, useState } from "react";

const User = ({ params }) => {
  const userID = decrypt(params.user);
  const [greeting, setGreeting] = useState("hello");
  const logOut = async () => {
    let cleanData = [];
    await GETCOLLECTION("users").then((response) => {
      cleanData = response;
    });
    cleanData.forEach(async (User) => {
      if (User.id === userID) {
        User.Active = false;
      }
      await SETDOC("users", User.id, { ...User });
      sessionStorage.clear();
      window.location.href = "/";
    });
  };
  const greetings = ["hello", "Bonjour", "Hola", "Ciao", "Namaste"];

  useEffect(() => {
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * greetings.length);
      setGreeting(greetings[randomIndex]);
    }, 5000);
  }, [greeting]);

  return (
    <div className="NotFound">
      <h1
        className="animate_animated animate__backOutDown"
        style={{ marginBottom: "100px" }}
      >
        {greeting}
      </h1>
      <p>You Are Now Logged in</p>
      <div className="Button-wrapper">
        <a
          onClick={() => {
            window.location.href = `/Portal/${params.user}/settings`;
          }}
        >
          Edit Account Settings
        </a>

        <a onClick={logOut}>Log Out</a>
      </div>
    </div>
  );
};

export default User;
