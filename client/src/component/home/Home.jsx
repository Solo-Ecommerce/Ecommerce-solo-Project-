import React from "react";
import { useNavigate } from "react-router-dom";
// import Navbar from "../navbar/Navbar";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/signin");
  };

  return (
    <div className="home__container">
      <button onClick={handleNavigate}>Click to navigate</button>
    </div>
  );
}

export default Home;
