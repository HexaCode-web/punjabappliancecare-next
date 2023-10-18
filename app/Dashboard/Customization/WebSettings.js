"use client";

import React, { useState, useEffect } from "react";
import "./WebSettings.css";

import GETCOLLECTION from "@/lib/getCollection";
import GETDOC from "@/lib/getDoc";
import SETDOC from "@/lib/setDoc";
import UPDATEDOC from "@/lib/updateDoc";
import UPLOADPHOTO from "@/lib/uploadPhoto";
import CreateToast from "@/lib/createToast";

import Main from "./Main";

import Template1 from "./SidePages/Template1";
import Template2 from "./SidePages/Template2";
import Template3 from "./SidePages/Template3";
import Template4 from "./SidePages/Template4";
import General from "./General";
const WebSettings = ({ SetCustomizationPage, customizationPage }) => {
  const [saving, SetSaving] = useState(false);
  const [activePage, setActivePage] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState(null);
  const [componentMapping, setComponentMapping] = useState({});
  const [downloadPath, setDownloadPath] = useState("");
  const [combinedList, setCombinedList] = useState([]);

  const objectToArray = (obj) => {
    return Object.keys(obj).map((key) => ({
      key,
      ...obj[key],
    }));
  };
  useEffect(() => {
    let NewList = [];
    if (!isLoading) {
      for (const key in fetchedData[1]) {
        NewList.push(fetchedData[1][key].id);
      }
      NewList.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

      setCombinedList(NewList);
    }
  }, [fetchedData]);

  const templateComponents = {
    Template1,
    Template2,
    Template3,
    Template4,
  };
  const extractComponentMapping = (FetchedData) => {
    const componentMapping = {};
    Object.entries(FetchedData).forEach(([key, value]) => {
      const { Template, id } = value;
      const ComponentToRender = templateComponents[Template];
      if (ComponentToRender) {
        componentMapping[id] = { ComponentToRender, DataToFetch: key };
      }
    });

    return componentMapping;
  };
  useEffect(() => {
    if (fetchedData) {
      setComponentMapping(extractComponentMapping(fetchedData[1]));
    }
  }, [fetchedData]);

  const FindPage = (id) => {
    let TargetData;
    for (const key in fetchedData[1]) {
      const element = fetchedData[1][key];
      if (element.id == id) {
        TargetData = element;
        break;
      }
    }
    return TargetData;
  };
  const RenderNav = fetchedData
    ? combinedList.map((tab, index) => {
        const Page = FindPage(tab);

        const delayString = (index * 0.05).toString() + "s";
        let nameToRender;
        switch (Page.PageURL) {
          case "":
            nameToRender = "Hidden page";
            break;

          default:
            nameToRender = FindPage(tab).PageName;
            break;
        }
        return (
          <li
            style={{ animationDelay: delayString }}
            className="animate__animated animate__fast animate__fadeIn"
            key={tab}
            onClick={() => {
              SetCustomizationPage(tab);
            }}
          >
            <div>
              <p> {nameToRender}</p>

              <p>Page ID : {Page.id}</p>

              <p>Page Type : {Page.PageType}</p>
            </div>
          </li>
        );
      })
    : "";
  useEffect(() => {
    const FetchData = async () => {
      setFetchedData(await GETCOLLECTION("customization"));
      setLoading(false);
    };
    FetchData();
  }, []);
  const UpdateGeneralData = async (NewValue) => {
    SetSaving(true);
    await SETDOC("customization", "Website", { ...NewValue }, false);
    setFetchedData(await GETCOLLECTION("customization"));
    CreateToast("Data Updated", "success", 2000);
    SetSaving(false);
  };
  const UpdateData = async (ChangedValue, NewValue) => {
    SetSaving(true);
    if (!NewValue.PageName) {
      CreateToast("Page Name cant be empty", "error", 1000);
      return;
    }
    const FormattedPageName = NewValue.PageName.replace(/\s+$/, "");
    const FormattedPageURL = NewValue.PageURL.replace(/\s+$/, "");

    CreateToast("Updating Data..", "info", 1000);
    const FetchedData = await GETCOLLECTION("customization");
    const FetchedDataAr = objectToArray(FetchedData[1]);
    for (const element of FetchedDataAr) {
      if (element.id === NewValue.id) {
        continue;
      }
      if (FormattedPageURL !== "" && element.PageURL === FormattedPageURL) {
        CreateToast("Page URL already exists", "error", 1000);
        return;
      }
    }
    await UPDATEDOC("customization", "Sidepages", {
      [ChangedValue]: {
        ...NewValue,
        PageName: FormattedPageName,
        PageURL: FormattedPageURL,
      },
    });
    setFetchedData(await GETCOLLECTION("customization"));
    CreateToast("Data Updated", "success", 2000);
    SetSaving(false);
  };

  const handleNav = (WhereTo) => {
    if (WhereTo === "Tab") {
      if (saving) {
        CreateToast("saving please wait", "error", 2000);
        return;
      } else {
        setActivePage("");
      }
    } else {
      if (saving) {
        CreateToast("saving please wait", "error", 2000);
        return;
      } else {
        setActivePage("");
        SetCustomizationPage("Nav1");
      }
    }
  };

  const generateSitemap = async () => {
    CreateToast("Generating sitemap", "info");

    //fetch the raw data
    const websiteName = window.location.origin;
    const Pages = await GETDOC("customization", "Sidepages");
    let ArPages = [`${websiteName}/`];
    //get the urls
    for (const key in Pages) {
      if (Object.hasOwnProperty.call(Pages, key)) {
        const element = Pages[key];
        if (
          element.id === "14" ||
          element.id === "15" ||
          element.id === "16" ||
          element.PageURL === ""
        ) {
          continue;
        } else {
          ArPages.push(`${websiteName}/${element.PageURL}`);
        }
      }
    }

    const sitemapString =
      '<?xml version="1.0" encoding="UTF-8" ?>\n' +
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" \n  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  \n  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 \n http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"> \n' +
      ArPages.map(
        (url) => `<url>
      <loc>${url}</loc>
    
      \n </url>`
      ).join("\n") +
      "\n" +
      "</urlset>";
    //run the download function
    await downloadSitemap(sitemapString);
    CreateToast("sitemap is ready", "success");
  };
  useEffect(() => {
    const getSiteMapURL = async () => {
      const sitemapURL = await GETDOC("customization", "sitemap");
      setDownloadPath(sitemapURL.urlFireBase);
    };
    getSiteMapURL();
  }, []);
  const downloadSitemap = async (DataToDownload) => {
    // Create a Blob with the sitemap content and trigger a download
    const blob = new Blob([DataToDownload], { type: "application/xml" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sitemap.xml";
    document.body.appendChild(a);
    const urlFireBase = await UPLOADPHOTO(
      "/customization/General/sitemap.xml",
      url
    );
    setDownloadPath(urlFireBase);
    SETDOC("customization", "sitemap", { urlFireBase });
    a.click();
    window.URL.revokeObjectURL(url);
  };
  const copyText = () => {
    navigator.clipboard
      .writeText(downloadPath)
      .then(() => {
        // Successfully copied to clipboard
        CreateToast("Path copied", "success");
      })
      .catch((error) => {
        CreateToast(`Error copying Path:  ${error}`, "error");
      });
  };

  return (
    <div className="WebSettings">
      {!isLoading && (
        <>
          <h1 className="animate__animated animate__fast animate__backInDown ql-align-center">
            {customizationPage === "Nav1"
              ? "Website Settings"
              : customizationPage === "Landing Page"
              ? "Main Page"
              : customizationPage === "General"
              ? "General Settings"
              : FindPage(customizationPage).PageName}
          </h1>
          {customizationPage === "Nav1" && (
            <p style={{ textAlign: "center", color: "green" }}>
              Ctrl+F to search
            </p>
          )}
          {customizationPage === "Nav1" && (
            <div className="button-wrapper">
              <button className="Button" onClick={generateSitemap}>
                Generate and download site map
              </button>
              {downloadPath && (
                <button className="Button" onClick={copyText}>
                  Copy the sitemap.xml file Path
                </button>
              )}
            </div>
          )}

          {customizationPage === "Nav1" && (
            <ul className="NavWrapper">
              <>
                <li
                  className="animate__animated animate__fast animate__fadeIn"
                  onClick={() => {
                    SetCustomizationPage("General");
                  }}
                >
                  General
                </li>
                <li
                  className="animate__animated animate__fast animate__fadeIn"
                  onClick={() => {
                    SetCustomizationPage("Landing Page");
                  }}
                >
                  Landing Page
                </li>
                {RenderNav}
              </>
            </ul>
          )}
          {customizationPage !== "Nav1" && (
            <span
              className="Link Reverse"
              onClick={() => {
                handleNav("Main");
              }}
            >
              Go Back to Main tab
            </span>
          )}
          {customizationPage === "Landing Page" && activePage !== "" && (
            <span
              className="Link Reverse"
              onClick={() => {
                handleNav("Tab");
              }}
            >
              Go Back to previous tab
            </span>
          )}
        </>
      )}

      {customizationPage === "Landing Page" && (
        <Main
          Data={fetchedData[0]}
          setActivePage={setActivePage}
          ActivePage={activePage}
          activeTab={customizationPage}
          setFetchedData={setFetchedData}
          setSaving={SetSaving}
          Tabs={fetchedData[1]}
        />
      )}
      {customizationPage === "General" && (
        <General Data={fetchedData[2]} UpdateGeneralData={UpdateGeneralData} />
      )}
      {combinedList.map((tab) => {
        const { ComponentToRender, DataToFetch } = componentMapping[tab] || {};

        if (customizationPage === tab && ComponentToRender) {
          return (
            <ComponentToRender
              key={tab}
              Data={fetchedData[1][DataToFetch]}
              UpdateData={UpdateData}
              BackEndName={DataToFetch}
              setActivePage={setActivePage}
              SetCustomizationPage={SetCustomizationPage}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default WebSettings;
