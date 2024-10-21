import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FaStar, FaRegStar } from "react-icons/fa";
import "./SoinsPieds.css";
import MainNavbar from "../navbar/MainNavbar";

function SoinsPieds() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const { category } = location.state || {};
  console.log("Selected category: ", category);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/products/getProductByCategory/${category}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (category) {
      getProducts();
    }
  }, [category]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} style={{ color: "#FFD700" }} />);
      } else {
        stars.push(<FaRegStar key={i} style={{ color: "#FFD700" }} />);
      }
    }
    return stars;
  };

  return (
    <div className="container__soins__peau">
      <div>
        <MainNavbar />
      </div>
      <div className="titre__container__soins__peau">
        <div className="color__soins__peau"></div>
        <div className="titre__soins_peau"> Soins des pieds</div>
      </div>
      <div className="display__products__container">
        {products.map((product, index) => (
          <div className="product__container__explore__product" key={index}>
            <div className="icon__img__container">
              <img
                className="image__our__products"
                src={product.images[0]}
                alt={product.name}
              />
              <div className="display__icon__products">
                <FontAwesomeIcon icon={faEye} className="icon" />
                <FontAwesomeIcon icon={faHeart} className="icon" />
              </div>
            </div>
            <div className="product__detail__container__products">
              <p className="name__of__products">{product.name}</p>
              <div className="product__detail__our__products">
                <p className="price__products">{product.price}</p>
                <div className="stars__product">
                  {renderStars(Math.round(product.averageRating))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SoinsPieds;
