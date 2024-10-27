import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getWishlist } from "../service/serviceWishlist";

function WishList() {
  const [userWishlist, setUserWishlist] = useState(null);
  const [wishlistProduct, setWishlistProduct] = useState([]);

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
      <h2>Wishlist</h2>
      {wishlistProduct.length > 0 ? (
        wishlistProduct.map((item, index) => (
          <div key={index}>
            <h3>Product: {item.Product?.name || "Unnamed Product"}</h3>
            <p>Price: {item.Product?.price}</p>
            <p>Description: {item.Product?.description}</p>
            <p>Category: {item.Product?.category}</p>
            <p>Average Rating: {item.Product?.averageRating}</p>
            <p>Ratings Count: {item.Product?.ratingsCount}</p>
            <img
              src={item.Product?.images}
              alt={item.Product?.name}
              style={{ width: "100px", height: "100px" }}
            />
          </div>
        ))
      ) : (
        <div>No products in wishlist</div>
      )}
    </div>
  );
}

export default WishList;
