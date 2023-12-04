"use client";
/* eslint-disable no-undef */
import React from "react";
import Section1 from "@/app/components/LandingPage/Section1/Section1";
import Section2 from "@/app/components/LandingPage/Section2/Section2";
import Section3 from "@/app/components/LandingPage/Section3/Section3";
import Section5 from "@/app/components/LandingPage/Section5/Section5";
import Section6 from "@/app/components/LandingPage/Section6/Section6";
import Section7 from "@/app/components/LandingPage/Section7/Section7";
import Section8 from "@/app/components/LandingPage/Section8/Section8";
import Section9 from "@/app/components/LandingPage/Section9/Section9";
import Map from "@/app/components/map";

const Template3 = ({ Data, width, Tabs, PageOrder, Email }) => {
  delete PageOrder["Section4"];
  const sortedEntries = Object.entries(PageOrder).sort((a, b) => a[1] - b[1]);
  const componentMap = {
    Section1,
    Section2,
    Section3,
    Section5,
    Section6,
    Section7,
    Section8,
    Section9,
  };

  return (
    <>
      <div className="SectionWrapper">
        {sortedEntries.map(([key, value]) => {
          let data;
          switch (key) {
            case "Section1":
              data = Data.Section1;
              break;
            case "Section2":
              data = Data.Section2;
              break;
            case "Section3":
              data = Data.Section3;
              break;

            case "Section5":
              data = Data.Section5;
              break;
            case "Section6":
              data = Data.Section6;
              break;
            case "Section7":
              data = Data.Section7;
              break;
            case "Section8":
              data = Data.Section8;
              break;
            case "Section9":
              data = Data.Section9;
              break;
            default:
              break;
          }
          const Component = componentMap[key];
          if (data.Show) {
            return (
              <Component
                screenWidth={width}
                key={key}
                value={value}
                ServerData={data}
                Email={Email}
                Tabs={Tabs}
                SpecialStyles={false}
              />
            );
          }
        })}
      </div>

      <Map address={Data.DesiredLocation} />
    </>
  );
};

export default Template3;
