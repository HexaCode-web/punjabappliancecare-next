"use client";
import React, { useEffect, useState } from "react";

import "aos/dist/aos.css";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import Loading from "./loading";
import "animate.css";
import Aos from "aos";
import GETCOLLECTION from "@/lib/getCollection";

export default function Home() {
  // const MainPage = dynamic(() => import("./components/MainPage"), {
  //   loading: () => <Loading loading={loading} />,
  //   ssr: false,
  // });
  const Header = dynamic(() => import("./components/Header/Header"), {
    loading: () => <Loading loading={loading} />,
    ssr: false,
  });
  const [webData, setWebData] = useState(null);
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [FetchedData, setFetchedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [PageOrder, setPageOrder] = useState(null);

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
      const Data = await GETCOLLECTION("customization");
      setWebData(Data[2]);
      setPageOrder(Data[0].PageOrder);
      setFetchedData(Data);
      setLoading(false);
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (webData) {
      const root = document.documentElement;
      root.style.setProperty("--buttons", webData.Colors.ButtonColors);
      root.style.setProperty("--text", webData.Colors.Text);
      root.style.setProperty("--borders", webData.Colors.Borders);
      root.style.setProperty("--Lines", webData.Colors.Lines);
      root.style.setProperty("--HoverText", webData.Colors.HoverText);
      root.style.setProperty("--LinkLines", webData.Colors.LinkLines);
    }
  }, [webData]);
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  return (
    <main>
      {/* <ToastContainer
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
      /> */}
      <Loading loading={loading} />

      {loading ? (
        ""
      ) : (
        <>
          <Header
            Email={FetchedData[0].FooterData.Email}
            Phone={FetchedData[0].FooterData.Phone}
            screenWidth={width}
            ServerData={FetchedData[0].Header}
          />
          {/* <MainPage
            width={width}
            FetchedData={FetchedData}
            Tabs={FetchedData[1]}
            PageOrder={PageOrder}
            Email={FetchedData[0].FooterData.Email}
          /> */}
        </>
      )}
    </main>
  );
}
