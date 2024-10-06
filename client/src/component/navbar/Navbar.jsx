import React from "react";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar__all__container">
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
      <div className="navbar__container">
        <h2 className="navbar__exclusive">Exclusive</h2>
        <div className="navbar__menu">
          <a className="navbar__cursor" href="/">
            Home
          </a>
          <a className="navbar__cursor" href="/contact">
            Contact
          </a>
          <a className="navbar__cursor" href="/about">
            About
          </a>
          <a className="navbar__cursor" href="/signin">
            Sign In
          </a>
          <div className="navbar__search">
            <FontAwesomeIcon icon={faSearch} className="navbar__search-icon" />
            <input type="text" placeholder="Search..." />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
