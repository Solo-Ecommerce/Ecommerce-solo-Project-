// MainNavbar.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./MainNavbar.css";

import "./Navbar.css";

function MainNavbar() {
  return (
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
  );
}

export default MainNavbar;
