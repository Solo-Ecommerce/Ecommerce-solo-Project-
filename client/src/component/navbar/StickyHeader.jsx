// StickyHeader.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import "./StickyHeader.css";

import "./Navbar.css";

function StickyHeader() {
  return (
    <div className="navbar__header">
      <p className="summer__navbar">
        Summer Sale For All Swim Suits and Free Delivery - OFF 50%!{" "}
      </p>
      <a className="shop__now__navbar" href="/home">
        {" "}
        shopNow
      </a>
      <p className="language_navbar">English</p>
      <FontAwesomeIcon icon={faAngleDown} className="arow__icon__navbar" />
    </div>
  );
}

export default StickyHeader;
