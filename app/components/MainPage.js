import React from "react";

import Loading from "../loading";
import dynamic from "next/dynamic";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper";
import "swiper/css/pagination";
const MainPage = ({ width, FetchedData, Tabs, PageOrder, Email }) => {
  const Section1 = dynamic(() => import("./LandingPage/Section1/Section1"), {
    loading: () => <Loading />,
    ssr: true,
  });
  const Section2 = dynamic(() => import("./LandingPage/Section2/Section2"), {
    loading: () => <Loading />,
    ssr: true,
  });
  const Section3 = dynamic(() => import("./LandingPage/Section3/Section3"), {
    loading: () => <Loading />,
    ssr: true,
  });
  const Section4 = dynamic(() => import("./LandingPage/Section4/Section4"), {
    loading: () => <Loading />,
    ssr: true,
  });
  const Section5 = dynamic(() => import("./LandingPage/Section5/Section5"), {
    loading: () => <Loading />,
    ssr: true,
  });
  const Section6 = dynamic(() => import("./LandingPage/Section6/Section6"), {
    loading: () => <Loading />,
    ssr: true,
  });
  const Section7 = dynamic(() => import("./LandingPage/Section7/Section7"), {
    loading: () => <Loading />,
    ssr: true,
  });
  const Section8 = dynamic(() => import("./LandingPage/Section8/Section8"), {
    loading: () => <Loading />,
    ssr: true,
  });
  const Section9 = dynamic(() => import("./LandingPage/Section9/Section9"), {
    loading: () => <Loading />,
    ssr: true,
  });

  const sortedEntries = Object.entries(PageOrder).sort((a, b) => a[1] - b[1]);
  const componentMap = {
    Section1,
    Section2,
    Section3,
    Section4,
    Section5,
    Section6,
    Section7,
    Section8,
    Section9,
  };

  return (
    <div className="SectionWrapper">
      {sortedEntries.map(([key, value]) => {
        let Data;
        switch (key) {
          case "Section1":
            Data = FetchedData[0].Section1;
            break;
          case "Section2":
            Data = FetchedData[0].Section2;
            break;
          case "Section3":
            Data = FetchedData[0].Section3;
            break;
          case "Section4":
            Data = FetchedData[0].Section4;
            break;
          case "Section5":
            Data = FetchedData[0].Section5;
            break;
          case "Section6":
            Data = FetchedData[0].Section6;
            break;
          case "Section7":
            Data = FetchedData[0].Section7;
            break;
          case "Section8":
            Data = FetchedData[0].Section8;
            break;
          case "Section9":
            Data = FetchedData[0].Section9;
            break;
          default:
            break;
        }
        const Component = componentMap[key];
        if (Data?.Show) {
          return (
            <Component
              screenWidth={width}
              key={key}
              value={value}
              ServerData={Data}
              Email={Email}
              Tabs={Tabs}
              SpecialStyles={false}
              Autoplay={Autoplay}
              Pagination={Pagination}
              SwiperSlide={SwiperSlide}
              Swiper={Swiper}
            />
          );
        }
      })}
    </div>
  );
};
export default MainPage;
