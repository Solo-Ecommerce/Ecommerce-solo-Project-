import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar__container">
      <h2 className="navbar__exclusive">Exclusive</h2>
      <div className="navbar__menu">
        <a className="navbar__cursor">Home</a>
        <a className="navbar__cursor">Contact</a>
        <a className="navbar__cursor">About</a>
        <a className="navbar__cursor">Sign In</a>
        <div className="navbar__search">
          <FontAwesomeIcon icon={faSearch} className="navbar__search-icon" />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
