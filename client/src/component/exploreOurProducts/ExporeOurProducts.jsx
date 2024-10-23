import React, { useEffect, useState } from "react";
import "./ExporeOurProducts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import { getAllProducts } from "../service/serviceProducts";
import { getAverageRatingByProductId } from "../service/serviceRating";
import { useNavigate } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";

function ExporeOurProducts({ handleClickProdDetails }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [averageRatings, setAverageRatings] = useState({});

  const handleProductDetails = (id) => {
    console.log("click here this is a product is: ", id);
    handleClickProdDetails(id);
    navigate(`/productdetails`);
  };

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);

        // Fetch average ratings for each product
        const ratingsPromises = data.map(async (product) => {
          const ratingAverage = await getAverageRatingByProductId(
            product.productId
          );
          return {
            productId: product.productId,
            rating: ratingAverage.averageRating || 1, // Default to 1 if not available
          };
        });

        const ratings = await Promise.all(ratingsPromises);
        console.log(ratings, "raaaaaaaaating");

        // Store average ratings in an object keyed by productId
        const ratingsMap = {};
        ratings.forEach(({ productId, rating }) => {
          ratingsMap[productId] = parseFloat(rating); // Ensure rating is a number
        });
        setAverageRatings(ratingsMap);
        console.log("ratingsMap", ratingsMap);

        // Sort products by average rating (from highest to lowest)
        const sortedProducts = data
          .map((product) => ({
            ...product,
            averageRating: ratingsMap[product.productId] || 0,
          }))
          .sort((a, b) => b.averageRating - a.averageRating); // Sorting in descending order

        setProducts(sortedProducts); // Update state with sorted products
      } catch (err) {
        console.error("Failed to fetch products or ratings:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const renderStars = (rating) => {
    const stars = [];
    const ratingValue = rating || 0; // Use 0 if rating is undefined
    for (let i = 1; i <= 5; i++) {
      if (i <= ratingValue) {
        stars.push(<FaStar key={i} style={{ color: "#FFD700" }} />);
      } else {
        stars.push(<FaRegStar key={i} style={{ color: "#FFD700" }} />);
      }
    }
    return stars;
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
                <div className="average__rating__explore__product">
                  {renderStars(averageRatings[product.productId])}
                </div>
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
