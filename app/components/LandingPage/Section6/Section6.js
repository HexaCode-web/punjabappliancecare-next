import React, { useState } from "react";
import "./Section6.css";
import Location from "./Location";
const Section6 = (props) => {
  const ServerData = props.ServerData;
  const TabsAR = Object.values(props.Tabs);
  return (
    <div className="Section6">
      {ServerData.Title && <h2 data-aos="fade-down">{ServerData.Title}</h2>}
      {ServerData.Paragraph && <p data-aos="fade-up">{ServerData.Paragraph}</p>}
      <div className="e-con-inner">
        <ul className="elementor">
          {ServerData.Areas.map((area) => {
            let targetTab;
            TabsAR.forEach((page) => {
              if (page.id == area.TargetPage) {
                targetTab = page;
              }
            });
            return <Location key={area.id} area={area} targetTab={targetTab} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Section6;
