import React, { useEffect, useState } from "react";
import "./Header.css";
import ContactPopUp from "../PopUps/ContactPopup/ContactPopup";

const Header2 = (props) => {
  const [location, setLocation] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLocation(window.location.href);
    }
  }, []);

  const [showModal, setShowModal] = React.useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  return (
    <div className={`Header ${location?.includes("/") ? "Second " : ""}`}>
      <div className="Content">
        <div className="TopBar"></div>
        <div className="BTM">
          <h1 className="animate__fast animate__fadeInDown">{props.title}</h1>
          <p className=" animate__animated  animate__fadeInUp">
            {props.subTitle}
          </p>
          {props.Template === "Template2" && (
            <div className="button-wrapper animate__animated   animate__fadeInUp">
              <button className="Button" onClick={handleShowModal}>
                {props.Template === "Template1" ||
                props.Template === "Template4"
                  ? "Contact us"
                  : "Request this service"}
              </button>
              <a className="Button" href={`tel:${props.Phone}`}>
                Give us a call
              </a>
            </div>
          )}
        </div>
      </div>
      <div
        className="overlay"
        style={{
          backgroundImage: `url(${props.bg})`,
          transform: "ScaleX(1)",
        }}
      ></div>
      <ContactPopUp
        show={showModal}
        handleClose={handleCloseModal}
        type="Contact"
      />
    </div>
  );
};

export default Header2;
