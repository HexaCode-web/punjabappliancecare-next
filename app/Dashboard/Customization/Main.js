"use client";
import React from "react";
import "./WebSettings.css";
import HeaderSettings from "./MainPageSettings/HeaderSettings";
import SETDOC from "@/lib/setDoc";
import GETCOLLECTION from "@/lib/getCollection";
import CreateToast from "@/lib/createToast";
import Section1 from "./MainPageSettings/Section1";
import Section2 from "./MainPageSettings/Section2";
import Section3 from "./MainPageSettings/Section3";
import Section4 from "./MainPageSettings/Section4";
import Section5 from "./MainPageSettings/Section5";
import Section6 from "./MainPageSettings/Section6";
import Section7 from "./MainPageSettings/Section7";
import Section8 from "./MainPageSettings/Section8";
import Section9 from "./MainPageSettings/Section9";
import FooterEdit from "./MainPageSettings/Footer";
import PageOrder from "./MainPageSettings/PageOrder";

const Main = ({
  Data,
  setActivePage,
  ActivePage,
  activeTab,
  setFetchedData,
  setSaving,
  Tabs,
}) => {
  const keysArray = Object.keys(Data);
  const sortedArray = keysArray.sort((a, b) => {
    const numberA = parseInt(a.match(/\d+$/)); // Extract number from the end of 'a'
    const numberB = parseInt(b.match(/\d+$/)); // Extract number from the end of 'b'

    if (isNaN(numberA)) {
      return 1; // 'a' does not have a number, move it to the back
    } else if (isNaN(numberB)) {
      return -1; // 'b' does not have a number, move it to the back
    } else {
      return numberA - numberB; // Compare the extracted numbers
    }
  });
  const RenderNav = sortedArray.map((tab, index) => {
    const delayString = (index * 0.1).toString() + "s";
    let nameToRender;
    let Description;
    switch (tab) {
      default:
        Description = Data[tab].Description;

        nameToRender = tab;
        break;
    }
    return (
      <li
        className="animate__animated animate__fast animate__fadeIn"
        style={{
          animationDelay: delayString,
          display: "flex",
          flexDirection: "column",
        }}
        key={tab}
        onClick={() => {
          setActivePage(tab);
        }}
      >
        {nameToRender}
        {Description && <p>Description:{Description}</p>}
      </li>
    );
  });
  const UpdateData = async (ChangedValue, NewValue) => {
    setSaving(true);
    CreateToast("Updating Data..", "info", 1000);
    const DataToSend = { ...Data, [ChangedValue]: NewValue };
    await SETDOC("customization", "Main", { ...DataToSend }, false);
    setFetchedData(await GETCOLLECTION("customization"));
    CreateToast("Data Updated", "success", 2000);
    setSaving(false);
  };
  return (
    <div style={{ width: "100%" }}>
      {activeTab === "Landing Page" && ActivePage === "" && (
        <ul className="NavWrapper">
          <>{RenderNav}</>
        </ul>
      )}
      {ActivePage === "Header" && (
        <HeaderSettings Data={Data.Header} UpdateData={UpdateData} />
      )}
      {ActivePage === "Section1" && (
        <Section1 FetchedData={Data.Section1} UpdateData={UpdateData} />
      )}

      {ActivePage === "Section2" && (
        <Section2 FetchedData={Data.Section2} UpdateData={UpdateData} />
      )}

      {ActivePage === "Section3" && (
        <Section3 FetchedData={Data.Section3} UpdateData={UpdateData} />
      )}

      {ActivePage === "Section4" && (
        <Section4 FetchedData={Data.Section4} UpdateData={UpdateData} />
      )}

      {ActivePage === "Section5" && (
        <Section5 FetchedData={Data.Section5} UpdateData={UpdateData} />
      )}

      {ActivePage === "Section6" && (
        <Section6
          FetchedData={Data.Section6}
          UpdateData={UpdateData}
          Tabs={Tabs}
        />
      )}

      {ActivePage === "Section7" && (
        <Section7 FetchedData={Data.Section7} UpdateData={UpdateData} />
      )}
      {ActivePage === "Section8" && (
        <Section8 FetchedData={Data.Section8} UpdateData={UpdateData} />
      )}
      {ActivePage === "Section9" && (
        <Section9 FetchedData={Data.Section9} UpdateData={UpdateData} />
      )}

      {ActivePage === "PageOrder" && (
        <PageOrder FetchedData={Data.PageOrder} UpdateData={UpdateData} />
      )}
      {ActivePage === "FooterData" && (
        <FooterEdit
          FetchedData={Data.FooterData}
          UpdateData={UpdateData}
          Tabs={Tabs}
        />
      )}
    </div>
  );
};

export default Main;
