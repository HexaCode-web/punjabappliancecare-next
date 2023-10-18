import Link from "next/link";
import React from "react";

const Location = ({ area, targetTab }) => {
  return (
    <Link data-aos="fade-up" href={`/${targetTab.PageURL}`}>
      {area.area}
    </Link>
  );
};

export default Location;
