import React, { useEffect, useState } from "react";
import MainNavbar from "../navbar/MainNavbar";
import { getOneProduct } from "../service/serviceProducts";
import "./ProductDetails.css";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaTruck, FaUndo } from "react-icons/fa";
import { getAllProducts } from "../service/serviceProducts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAverageRatingByProductId } from "../service/serviceRating";
import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";

function ProductDetails({ productDetailId }) {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [productByCategory, setProductByCategory] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [averageRatings, setAverageRatings] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getOneProduct(productDetailId);
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProduct();
  }, [productDetailId]);

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

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity > 0) {
        return prevQuantity - 1;
      }
      return 0;
    });
  };

  // Fetch related products by category and average ratings
  useEffect(() => {
    const getProductByCategory = async () => {
      try {
        const data = await getAllProducts();
        const filteredProducts = data.filter(
          (item) => item.category === product.category
        );
        setProductByCategory(filteredProducts);

        const ratingsPromises = filteredProducts.map(async (prod) => {
          const ratingData = await getAverageRatingByProductId(prod.productId);
          return {
            productId: prod.productId,
            rating: ratingData.averageRating || 1,
          };
        });

        const ratings = await Promise.all(ratingsPromises);
        const ratingsMap = {};
        ratings.forEach(({ productId, rating }) => {
          ratingsMap[productId] = parseFloat(rating);
        });

        setAverageRatings(ratingsMap);
      } catch (err) {
        console.error("Failed to fetch products or ratings:", err);
      }
    };

    if (product && product.category) {
      getProductByCategory();
    }
  }, [product]);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  return (
    <div>
      <div>
        <MainNavbar />
      </div>
      <div className="container__product__details">
        <div className="image__product__details__container">
          {product.images && product.images.length > 0 && (
            <>
              <img
                className="image__1__product__details"
                src={product.images[0]}
                style={{ width: "400px", height: "250px" }}
                alt="1"
              />

              <div className="other__image__container">
                <img
                  className="image__2__product__details"
                  src={product.images[1]}
                  style={{ width: "150px", height: "120px" }}
                  alt="2"
                />
                <img
                  className="image__3__product__details"
                  src={product.images[2]}
                  style={{ width: "150px", height: "120px" }}
                  alt="3"
                />
                <img
                  className="image__4__product__details"
                  src={product.images[3]}
                  style={{ width: "150px", height: "120px" }}
                  alt="4"
                />
              </div>
            </>
          )}
        </div>
        <div className="details__product__details">
          <h3 className="product__name__Product__details">{product.name}</h3>
          <div className="stars__product__details">
            {renderStars(Math.round(product.averageRating))}
          </div>
          <div className="price__product__details">{product.price}$</div>
          <div>{product.description}</div>

          {/* kkl */}

          <div className="buy__product__container">
            <div className="nombre__of__items__product__details">
              <div
                className="min__sign__product__details"
                onClick={handleDecrease}
              >
                <FaMinus
                  className="icon__min__sign__product__details"
                  style={{ color: "black", fontSize: "18px" }}
                />
              </div>

              <div className="nombre__product__details">{quantity}</div>
              <div
                className="plus__sign__product__details"
                onClick={handleIncrease}
              >
                <FaPlus
                  className=" icon__plus__sign__product__details"
                  style={{ color: "white", fontSize: "18px" }}
                />
              </div>
            </div>
            <div className="heart__container">
              <div className="buy__now__product__details">Buy Now</div>
              <div className="heart__icon__product__details">
                <FaRegHeart style={{ color: "black", fontSize: "20px" }} />
              </div>
            </div>
          </div>

          <div className="delivery__product__details">
            <div className="livraison__gratuite">
              <FaTruck style={{ fontSize: "25px", color: "grey" }} />
              <span>Livraison Gratuite</span>
            </div>
            <div className="retour__livraison">
              <FaUndo style={{ fontSize: "25px", color: "grey" }} />
              <span>Retour de livraison</span>
            </div>
          </div>
        </div>
      </div>

      <div className="related__product__container__details">
        <div className="related__product__details"></div>
        <div className="title__relation__product__detail">Related Products</div>
        <div className="display__products__container__details">
          {productByCategory.slice(0, visibleCount).map((product, index) => (
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
                  <p className="average__products">
                    {" "}
                    {renderStars(averageRatings[product.productId])}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
