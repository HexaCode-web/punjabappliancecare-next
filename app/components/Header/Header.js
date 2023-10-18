import React from "react";
import "./Header.css";
import ContactPopUp from "../PopUps/ContactPopup/ContactPopup";
import ContactForm from "../PopUps/ContactForm";
const Header = (props) => {
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

      <div
        className={`overlay ${
          props.screenWidth > 500 && severData.ShowVideo ? "Video" : "Photo"
        }`}
        style={{
          backgroundImage: `url(${
            props.screenWidth < 500
              ? severData.BGURL
              : severData.ShowVideo
              ? ""
              : severData.BGURL
          })`,
        }}
      >
        {severData.ShowVideo && props.screenWidth > 500 && (
          <video autoPlay muted loop>
            <source src={severData.VideoBG} />
          </video>
        )}
      </div>
      <ContactPopUp
        show={showModal}
        handleClose={handleCloseModal}
        type="Project"
      />
    </div>
  );
};

export default Header;
