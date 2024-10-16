import React, { useEffect, useState } from "react";
import "./ExporeOurProducts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import { getAllProducts } from "../service/serviceProducts";
import { useNavigate } from "react-router-dom";
function ExporeOurProducts({ handleClickProdDetails }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);

  const handleProductDetails = (id) => {
    handleClickProdDetails(id);
    navigate(`/productdetails`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
        console.log("all products", data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  return (
    <div className="container__explore__products">
      <div className="explore__product__title">
        <div className="explore__product__color"></div>
        <div className="explore__product__text">Nos Produits</div>
      </div>
      <h3 className="explorez__poduits__name">Explorez nos produits </h3>

      <div className="display__products__container">
        {products.slice(0, visibleCount).map((product, index) => (
          <div
            className="product__container__explore__product"
            key={index}
            onClick={() => handleProductDetails(product.productId)}
          >
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
                <p>⭐⭐⭐</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < products.length && (
        <button className="show-more-button" onClick={handleShowMore}>
          Show More
        </button>
      )}
    </div>
  );
}

export default ExporeOurProducts;
