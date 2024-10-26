import React from "react";
import "./Home.css";
import HeroSection from "../HeroSection/HeroSection";
import ExporeOurProducts from "../exploreOurProducts/ExporeOurProducts";
import MainNavbar from "../navbar/MainNavbar";
import Categories from "../categories/Categories";
function Home({
  handleClickProdDetails,
  SendCategory,
  clickedElemCategory,
  handleClickProductWishlist,
}) {
  return (
    <div className="home__container">
      <MainNavbar handleClickProductWishlist={handleClickProductWishlist} />
      <HeroSection />
      <ExporeOurProducts
        handleClickProdDetails={handleClickProdDetails}
        handleClickProductWishlist={handleClickProductWishlist}
      />
      <Categories
        SendCategory={SendCategory}
        clickedElemCategory={clickedElemCategory}
      />
    </div>
  );
}

export default Home;
