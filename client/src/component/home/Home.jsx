import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/signin"); // Corrected typo here
  };

  return (
    <div>
      <button onClick={handleNavigate}>Click to navigate</button>
    </div>
  );
}

export default Home;
