import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getWishlist } from "../service/serviceWishlist";
import MainNavbar from "../navbar/MainNavbar";
import { FaTrashAlt } from "react-icons/fa";
import "./WishList.css";

function WishList() {
  const [userWishlist, setUserWishlist] = useState(null);
  const [wishlistProduct, setWishlistProduct] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserWishlist(decoded);
      console.log("User ID:", decoded.id);
    }
  }, []);

  useEffect(() => {
    const getWishlistByUser = async () => {
      if (userWishlist && userWishlist.id) {
        try {
          const data = await getWishlist(userWishlist.id);
          setWishlistProduct(data);
          console.log("Fetched wishlist products:", data);
        } catch (err) {
          console.error("Failed to fetch product for wishlist:", err);
        }
      }
    };
    getWishlistByUser();
  }, [userWishlist]);

  return (
    <div>
      <MainNavbar />

      <div className="wishlist__grid">
        {wishlistProduct.length > 0 ? (
          wishlistProduct.map((item, index) => (
            <div key={index} className="wishlist__container">
              <div className="delete__image__wishlist">
                <img
                  className="img__product__wishlist"
                  src={item.Product?.images[0]}
                  alt={item.Product?.name}
                  style={{ width: "150px", height: "150px" }}
                />
                <FaTrashAlt
                  className="delete-icon"
                  // onClick={() => handleDelete(item.Product?.productId)}
                  title="Remove from wishlist"
                />
              </div>
              <div className="product__details__wishlist">
                <h3>Product: {item.Product?.name}</h3>
                <p>Price: {item.Product?.price}</p>
                <p>Description: {item.Product?.description}</p>
                <p>Category: {item.Product?.category}</p>
              </div>
              <button className="pannier__button__wishlist">
                Ajouter au pannier
              </button>
            </div>
          ))
        ) : (
          <div>No products in wishlist</div>
        )}
      </div>
    </div>
  );
}

export default WishList;
