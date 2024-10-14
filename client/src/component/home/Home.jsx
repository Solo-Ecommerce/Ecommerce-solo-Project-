import React from "react";
import "./Home.css";
import HeroSection from "../HeroSection/HeroSection";
import ExporeOurProducts from "../exploreOurProducts/ExporeOurProducts";
import MainNavbar from "../navbar/MainNavbar";
function Home() {
  return (
    <div className="home__container">
      <MainNavbar />
      <HeroSection />
      <ExporeOurProducts />
    </div>
  );
}

export default Home;
