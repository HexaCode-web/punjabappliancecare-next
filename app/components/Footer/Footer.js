"use client";
import React, { useState, useEffect } from "react";
import "./Footer.css";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const [tabs, setTabs] = useState(null);
  const [serverData, setServerData] = useState(null);
  const [socialContainer, SetSocialContainer] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [mainPageData, sidePagesData] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_END_POINT_URL}/MainPage`).then((res) =>
          res.json()
        ),
        fetch(`${process.env.NEXT_PUBLIC_END_POINT_URL}/SidePages`).then(
          (res) => res.json()
        ),
      ]);
      const formattedPageData = mainPageData[0];
      setTabs(sidePagesData);
      setServerData(formattedPageData.FooterData);
    };
    fetchData();
  }, []);
  const objectToArray = (obj) => {
    return Object.keys(obj).map((key) => ({
      key,
      ...obj[key],
    }));
  };
  useEffect(() => {
    if (serverData) {
      for (const Social in serverData.Socials) {
        SetSocialContainer((prev) => [
          ...prev,
          { name: Social, Link: serverData.Socials[Social] },
        ]);
      }
    }
  }, [serverData]);
  const RenderSocials = socialContainer?.map((Social) => {
    let img = "";
    let link;
    switch (Social.name) {
      case "Facebook":
        img = "/facebook.png";
        link = Social.Link;

        break;
      case "Youtube":
        img = "/youtube.png";
        link = Social.Link;

        break;
      case "Twitter":
        img = "/twitter.png";
        link = Social.Link;

        break;
      case "Telegram":
        img = "/telegram.png";
        link = Social.Link;

        break;
      case "Pinterest":
        img = "/pinterest.png";
        link = Social.Link;

        break;
      case "Instagram":
        img = "/instagram.png";
        link = Social.Link;

        break;
      case "WhatsApp":
        img = "/whatsapp.png";
        link = `https://wa.me/${Social.Link}`;
        break;
      case "Skype":
        img = "/skype.png";
        link = Social.Link;

        break;
      case "Linkedin":
        img = "/linkedin.png";
        link = Social.Link;

        break;
      default:
        link = Social.Link;

        break;
    }

    return Social.Link ? (
      <li>
        <Link href={link}>
          <Image src={img} alt={Social.name} width="30" height="30" />
        </Link>
      </li>
    ) : (
      ""
    );
  });
  const RepairPages = tabs
    ? objectToArray(tabs)
        .map((tab) => {
          if (tab.PageType === "Repair" && tab.PageURL !== "") {
            return tab;
          }
        })
        .filter((tab) => tab !== undefined)
    : "";
  const installationPages = tabs
    ? objectToArray(tabs)
        .map((tab) => {
          if (tab.PageType === "installation" && tab.PageURL !== "") {
            return tab;
          }
        })
        .filter((tab) => tab !== undefined)
    : "";
  const renderRepair = tabs
    ? RepairPages.map((RepairPage) => {
        return (
          <li key={RepairPage.id}>
            <Link href={`/${RepairPage.PageURL}`}>{RepairPage.PageName}</Link>
          </li>
        );
      })
    : "";
  const renderInstallation = tabs
    ? installationPages.map((installationPage) => {
        return (
          <li key={installationPage.id}>
            <Link href={`/${installationPage.PageURL}`}>
              {installationPage.PageName}
            </Link>
          </li>
        );
      })
    : "";
  const renderLinks = serverData?.Links?.map((link) => {
    if (link.FromPages) {
      const AttachedPage = objectToArray(tabs).find((Tab) => {
        return Tab.id == link.PageID;
      });
      return (
        <li key={link.id}>
          <Link href={`/${AttachedPage.PageURL}`}>{AttachedPage.PageName}</Link>
        </li>
      );
    } else {
      return (
        <li key={link.id}>
          <Link target="_blank" rel="noopener noreferrer" href={link.link}>
            {link.LinkLabel}
          </Link>
        </li>
      );
    }
  });
  const TOUPage = tabs?.find((page) => page.id == 15);
  const privacyPage = tabs?.find((page) => page.id == 16);
  return (
    <>
      {serverData && (
        <div className="FooterWrapper">
          <div className="columns">
            <div className="col">
              <p>CONTACT</p>
              {serverData?.Email && (
                <Link
                  className="ContactIcon"
                  href={`mailto:${serverData?.Email}`}
                >
                  <Image alt="email" width="24" height="24" src="/mail.png" />
                  {serverData.Email}
                </Link>
              )}
              {serverData?.Phone && (
                <a className="ContactIcon" href={`tel:${serverData?.Phone}`}>
                  <Image alt="phone" width="24" height="24" src="/phone.png" />
                  {serverData.Phone}
                </a>
              )}
              {serverData?.address?.Address && (
                <div className="field">
                  <span>{serverData.address.title}</span>
                  <p>{serverData.address.Address}</p>
                </div>
              )}
              {serverData?.address?.Address && (
                <div className="field">
                  <span>{serverData.ExtraAddress.title}</span>
                  <p>{serverData.ExtraAddress.Address}</p>
                </div>
              )}
            </div>
            <div className="col">
              <p>REPAIRS</p>
              <ul>{renderRepair}</ul>
            </div>
            <div className="col">
              <p>INSTALLATIONS</p>
              <ul>{renderInstallation}</ul>
            </div>
            <div className="col">
              <p>OTHER LINKS</p>
              <ul>
                <li>
                  <Link href={`/Portal`}>Portal</Link>
                </li>
                {renderLinks}
              </ul>
            </div>
          </div>
          <div className="Links">
            <p>Follow us</p>
            <ul>{RenderSocials}</ul>
          </div>
          <div className="CopyRight">
            <p>© 2023 punjab's Appliance Care. All Rights Reserved</p>
            <div>
              <Link href={TOUPage.PageURL ? TOUPage.PageURL : ""}>
                Terms Of Use
              </Link>
              <span>&</span>
              <Link href={privacyPage.PageURL ? privacyPage.PageURL : ""}>
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      )}
      <div id="map"></div>
    </>
  );
};

export default Footer;
