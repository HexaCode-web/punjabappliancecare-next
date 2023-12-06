"use client";
import React, { useEffect, useState } from "react";
import "./Nav.css";
import Image from "next/image";

import RenderNav from "./RenderNav";

const Nav = () => {
  const [FetchedData, setFetchedData] = useState(null);
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
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

  useEffect(() => {
    const fetchData = async () => {
      const websiteData = await fetch(
        `${process.env.NEXT_PUBLIC_END_POINT_URL}/SidePages`
      ).then((res) => res.json());
      setFetchedData(websiteData);
    };
    fetchData();
  }, []);

  const [Color, setColor] = useState(false);

  const ChangeColor = () => {
    if (typeof window !== "undefined") {
      if (width < 500) {
        if (window.scrollY >= 20) {
          setColor(true);
        } else {
          setColor(false);
        }
      } else {
        if (window.scrollY >= 60) {
          setColor(true);
        } else {
          setColor(false);
        }
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => {
        ChangeColor();
      });
    }
  }, []);
  return (
    <nav
      className={`NavContainer animate__animated animate__fast animate__fadeInDown ${
        Color ? "NavContainer-bg" : ""
      }`}
    >
      <Image
        onClick={() => {
          window.location.href = "/";
        }}
        width={100}
        height={100}
        alt="Logo"
        className="Logo"
        priority
        src="https://firebasestorage.googleapis.com/v0/b/punjabappliancecare.appspot.com/o/customization%2FGeneral%2FLogo?alt=media&token=fd93bc61-3655-4016-892c-decdb8fdd2a7"
      />
      <RenderNav Tabs={FetchedData} />
    </nav>
  );
};

export default Nav;
