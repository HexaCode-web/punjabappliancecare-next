import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./CollapsibleElement.css"; // Create this CSS file for animations

function CollapsibleElement({ buttonText, Text }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="CollapseWrapper" data-aos="fade-down">
      <div
        onClick={toggleCollapse}
        className={`OpenCollapse ${isOpen ? "Opened" : ""}`}
      >
        <p>{buttonText}</p>
        <span className="Indicator"></span>
        <span className="Indicator Two"></span>
      </div>

      <CSSTransition
        in={isOpen}
        timeout={200} // Animation duration in milliseconds
        classNames="collapse"
        unmountOnExit
      >
        <div className="collapsible-content">{Text}</div>
      </CSSTransition>
    </div>
  );
}

export default CollapsibleElement;
