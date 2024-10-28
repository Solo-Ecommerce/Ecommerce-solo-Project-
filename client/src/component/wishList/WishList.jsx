import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getWishlist } from "../service/serviceWishlist";
import { removeFromWishlist } from "../service/serviceWishlist";
import MainNavbar from "../navbar/MainNavbar";
import { FaTrashAlt } from "react-icons/fa";
import "./WishList.css";

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

  // Delete a specific product from the wishlist
  const handleDelete = async (productId) => {
    try {
      await removeFromWishlist(userWishlist.id, productId);
      // Update wishlistProduct to remove only the deleted product
      setWishlistProduct((prevProducts) =>
        prevProducts.filter((item) => item.productId !== productId)
      );
      console.log("Product removed from wishlist:", productId);
    } catch (err) {
      console.error("Failed to remove product from wishlist:", err);
    }
  };

  return (
    <div>
      <MainNavbar />
      <div className="title__container__wishlist">
        <div className="color__wishlist"></div>
        <div className="title__wishlist">Vos Favoris</div>
      </div>
      <div className="little__title__wishlist">
        Votre liste de produit favoris{" "}
      </div>
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
                  onClick={() => handleDelete(item.Product?.productId)}
                  title="Remove from wishlist"
                />
              </div>
              <div className="product__details__wishlist">
                <p className="name__product__wishlist"> {item.Product?.name}</p>
                <p className="price__product__wishlist">
                  {item.Product?.price}
                </p>
                <p className="category__product__wishlist">
                  {" "}
                  {item.Product?.category}
                </p>
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
