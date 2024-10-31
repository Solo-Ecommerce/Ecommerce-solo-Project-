import React, { useEffect, useState } from "react";
import "./ExporeOurProducts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { getAllProducts } from "../service/serviceProducts";
import { getAverageRatingByProductId } from "../service/serviceRating";
import { useNavigate } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../service/serviceWishlist";
import { useStateValue } from "../../index";

function ExporeOurProducts({ handleClickProdDetails }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [averageRatings, setAverageRatings] = useState({});
  const [wishlistProduct, setWishlistProduct] = useState([]);
  const [user, setUser] = useState(null);
  const [{ cart }, dispatch] = useStateValue();

  // we gonna add item to cart using redux:
  // i need to fet the clicked product as at product details
  const addToCart = (product) => {
    dispatch({
      type: "ADD_ITEM_TO_CART",
      item: {
        id: product.productId,
        name: product.name,
        image: [...product.images.slice(0, 4)],
        price: product.price,
        description: product.description,
        rating: averageRatings[product.productId] || 0,
      },
    });
  };

  const handleProductDetails = (id) => {
    handleClickProdDetails(id);
    navigate(`/productdetails`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);

        const ratingsPromises = data.map(async (product) => {
          const ratingAverage = await getAverageRatingByProductId(
            product.productId
          );
          return {
            productId: product.productId,
            rating: ratingAverage.averageRating || 0,
          };
        });

        const ratings = await Promise.all(ratingsPromises);
        const ratingsMap = {};
        ratings.forEach(({ productId, rating }) => {
          ratingsMap[productId] = parseFloat(rating);
        });
        setAverageRatings(ratingsMap);

        const sortedProducts = data
          .map((product) => ({
            ...product,
            averageRating: ratingsMap[product.productId] || 0,
          }))
          .sort((a, b) => b.averageRating - a.averageRating);

        setProducts(sortedProducts);
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
    const ratingValue = rating || 0;
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= ratingValue ? (
          <FaStar key={i} style={{ color: "#FFD700" }} />
        ) : (
          <FaRegStar key={i} style={{ color: "#FFD700" }} />
        )
      );
    }
    return stars;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  }, []);

  useEffect(() => {
    const getWishlistByUser = async () => {
      if (user && user.id) {
        try {
          const data = await getWishlist(user.id);
          setWishlistProduct(data);
        } catch (err) {
          console.error("Failed to fetch wishlist:", err);
        }
      }
    };
    getWishlistByUser();
  }, [user]);

  const handleToggleWishlist = async (productId) => {
    if (!user) {
      console.log("Please log in to add items to your wishlist.");
      return;
    }

    const isInWishlist = wishlistProduct.some(
      (item) => item.productId === productId
    );

    try {
      if (isInWishlist) {
        await removeFromWishlist(user.id, productId);
        setWishlistProduct((prevProducts) =>
          prevProducts.filter((item) => item.productId !== productId)
        );
      } else {
        await addToWishlist(user.id, productId);
        setWishlistProduct((prevProducts) => [...prevProducts, { productId }]);
      }
    } catch (error) {
      console.error(
        isInWishlist
          ? "Error removing from wishlist:"
          : "Error adding to wishlist:",
        error.response?.data || error
      );
    }
  };

  return (
    <div className="container__explore__products">
      <div className="explore__product__title">
        <div className="explore__product__color"></div>
        <div className="explore__product__text">Nos Produits</div>
      </div>
      <h3 className="explorez__poduits__name">Explorez nos produits </h3>

      <div className="display__products__container">
        {products.slice(0, visibleCount).map((product, index) => {
          const isInWishlist = wishlistProduct.some(
            (item) => item.productId === product.productId
          );
          return (
            <div className="product__container__explore__product" key={index}>
              <div className="icon__img__container">
                <img
                  className="image__our__products"
                  src={product.images[0]}
                  alt={product.name}
                  onClick={() => handleProductDetails(product.productId)}
                />
                <div
                  className="display__icon__products"
                  onClick={() => handleToggleWishlist(product.productId)}
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{
                      fontSize: 30,
                      color: isInWishlist ? "#ff6700" : "rgb(0, 0, 0)",
                    }}
                    className={`icon ${isInWishlist ? "orange" : ""}`}
                  />
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
                <button
                  className="pannier__button__exploreProduct"
                  onClick={() => addToCart(product)}
                >
                  Ajouter au pannier
                </button>
              </div>
            </div>
          );
        })}
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
