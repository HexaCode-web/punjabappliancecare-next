"use client";

import { useEffect, useState } from "react";

import GETCOLLECTION from "@/lib/getCollection";

import NotFound from "../not-found";
import Loading from "../loading";
import dynamic from "next/dynamic";
import Aos from "aos";
import "aos/dist/aos.css";
import "animate.css";
const Page = ({ params }) => {
  const PageURL = params.pageName;
  const Template1 = dynamic(() => import("./Templates/Template1"), {
    loading: () => <Loading loading={loading} />,
    ssr: false,
  });
  const Template2 = dynamic(() => import("./Templates/Template2"), {
    loading: () => <Loading loading={loading} />,
    ssr: false,
  });
  const Template3 = dynamic(() => import("./Templates/Template3"), {
    loading: () => <Loading loading={loading} />,
    ssr: false,
  });
  const Template4 = dynamic(() => import("./Templates/Template4"), {
    loading: () => <Loading loading={loading} />,
    ssr: false,
  });
  // const Header = dynamic(() => import("../components/Header/Header"), {
  //   loading: () => <Loading loading={loading} />,
  //   ssr: false,
  // });
  // const Header2 = dynamic(() => import("../components/Header/Header2"), {
  //   loading: () => <Loading loading={loading} />,
  //   ssr: false,
  // });
  const [loading, setLoading] = useState(true);
  const [TargetPage, setTargetPage] = useState(null);
  const [tabs, setTabs] = useState(null);
  const [arPages, setarPages] = useState([]);
  const [PageOrder, setPageOrder] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const templateComponents = {
    Template1,
    Template2,
    Template3,
    Template4,
  };
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
    Aos.init({ duration: 500 });
  }, []);
  useEffect(() => {
    const fetchPages = async () => {
      const mainData = await GETCOLLECTION("customization");
      setEmail(mainData[0].FooterData.Email);
      setPhone(mainData[0].FooterData.Phone);
      setPageOrder(mainData[0].PageOrder);
      const webData = mainData[2];
      if (webData) {
        const root = document.documentElement;
        root.style.setProperty("--buttons", webData.Colors.ButtonColors);
        root.style.setProperty("--text", webData.Colors.Text);
        root.style.setProperty("--borders", webData.Colors.Borders);
        root.style.setProperty("--Lines", webData.Colors.Lines);
        root.style.setProperty("--HoverText", webData.Colors.HoverText);
        root.style.setProperty("--LinkLines", webData.Colors.LinkLines);
      }
      const pages = mainData[1];
      setTabs(pages);
      let tempAR = [];
      for (const key in pages) {
        if (Object.hasOwnProperty.call(pages, key)) {
          const element = pages[key];
          tempAR.push(element);
          const filteredPages = tempAR.filter((page) => page.PageURL !== "");

          setarPages(filteredPages);
        }
      }
    };
    fetchPages();
  }, []);
  useEffect(() => {
    if (arPages.length > 0) {
      const foundPage = arPages.find((page) => page.PageURL === PageURL);

      setTargetPage(foundPage);
      setLoading(false);
    }
  }, [arPages]);
  let HeaderTitle, BG, Template, headerSubTitle, callNumber, Component;

  if (TargetPage) {
    ({ HeaderTitle, BG, Template, headerSubTitle, callNumber } = TargetPage);
    Component = templateComponents[TargetPage.Template];
  }

  return (
    <>
      {loading ? (
        <Loading loading={loading} />
      ) : TargetPage ? (
        <>
          {/* {Template === "Template3" ? (
            <Header
              Email={email}
              Phone={phone}
              screenWidth={width}
              ServerData={TargetPage.Header}
            />
          ) : (
            <Header2
              title={HeaderTitle}
              bg={BG}
              subTitle={headerSubTitle}
              Phone={callNumber}
              Template={TargetPage?.Template}
            />
          )} */}
          <Component
            Data={TargetPage}
            width={width}
            Tabs={tabs}
            PageOrder={PageOrder}
          />
        </>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default Page;
