import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./MainNavbar.css";
import "./Navbar.css";
import { jwtDecode } from "jwt-decode";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function MainNavbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  let decoded = null;

  if (token) {
    try {
      decoded = jwtDecode(token);
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
    }
  }

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbar__container">
      {decoded ? (
        <>
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
            <button className="navbar__cursor" onClick={handleLogOut}>
              Sign Out
            </button>
            <div className="navbar__icon__container">
              <div className="navbar__search">
                <input type="text" placeholder="Search..." />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="navbar__search-icon"
                />
              </div>

              <FaShoppingCart className="navbar__icon__navbar__icon-chart" />
              <FaHeart className="navbar__icon__navbar__icon-heart" />
            </div>
          </div>
        </>
      ) : (
        <div className="navbar__container__logout">
          <div className="navbar__container__logout">
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
                <FontAwesomeIcon
                  icon={faSearch}
                  className="navbar__search-icon"
                />
                <input type="text" placeholder="Search..." />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainNavbar;
