import React from "react";
import "./Header.css";
import Loading from "@/app/loading";
import dynamic from "next/dynamic";
import Image from "next/image";
const DynamicContactPopUp = dynamic(
  () => import("../PopUps/ContactPopup/ContactPopup"),
  {
    loading: () => <Loading />,
  }
);
const DynamicContactForm = dynamic(() => import("../PopUps/ContactForm"), {
  loading: () => <Loading />,
  ssr: false,
});

const Header = (props) => {
  const ContactPopUp = DynamicContactPopUp;
  const ContactForm = DynamicContactForm;
  const severData = props.ServerData;
  const [showModal, setShowModal] = React.useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  return (
    <div className="Header">
      <div className="Content">
        <div className="TopBar">
          {props.screenWidth > 1000 && severData.ShowContact && (
            <div className="Right animate__animated  animate__fast animate__fadeInRight">
              <span
                onClick={handleShowModal}
                style={{ color: severData.ContactColor }}
              >
                {severData.ContactText}
              </span>
            </div>
          )}
        </div>
        <div className="BTM">
          {severData.Title && (
            <h1
              id="HeaderTitle"
              className="animate__animated animate__fast animate__fadeInDown"
              style={{ color: severData.TitleColor }}
            >
              {severData.Title}
            </h1>
          )}
          {severData.SubTitle && (
            <h3
              className="animate__animated  animate__fast animate__fadeInUp"
              style={{ color: severData.SubTitleColor }}
            >
              {severData.SubTitle}
            </h3>
          )}
          {severData.buttonText && severData.ShowButton && (
            <a
              className="Button animate__animated  animate__fast animate__fadeInLeft"
              href={`tel:${props.Phone}`}
            >
              {severData.buttonText}
            </a>
          )}
        </div>
        {props.screenWidth > 1150 && (
          <div className="Left animate__animated  animate__fast animate__fadeInRight">
            <ContactForm textColor="White" />
          </div>
        )}
      </div>

      <Image
        alt="background"
        width="1366"
        height="650"
        className={`overlay ${
          props.screenWidth > 500 && severData.ShowVideo ? "Video" : "Photo"
        }`}
        src={
          props.screenWidth < 500
            ? severData.BGURL
            : severData.ShowVideo
            ? ""
            : severData.BGURL
        }
      />
      {severData.ShowVideo && props.screenWidth > 500 && (
        <video autoPlay muted loop className={`overlay Video`}>
          <source src={severData.VideoBG} />
        </video>
      )}
      <ContactPopUp
        show={showModal}
        handleClose={handleCloseModal}
        type="Project"
        className=""
      />
    </div>
  );
};

export default Header;
