import React from "react";
import "./Home.css";
import HeroSection from "../HeroSection/HeroSection";
import ExporeOurProducts from "../exploreOurProducts/ExporeOurProducts";

function Home() {
  return (
    <div className="home__container">
      <HeroSection />
      <ExporeOurProducts />
    </div>
  );
}

export default Home;
