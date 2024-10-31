import React from "react";
import MainNavbar from "../navbar/MainNavbar";
import { useStateValue } from "../../index";
import "./Cart.css";

function Cart() {
  const [{ cart }, dispatch] = useStateValue();

  const removeFromCart = (id) => {
    dispatch({
      type: "REMOVE_ITEM_FROM_CART",
      id: id,
    });
  };

  return (
    <div>
      <MainNavbar />
      <div className="cart__container">
        <div>
          <img
            className="cart__img"
            src="https://www.pharmaciepolygone.com/media/image/49/7b/200c63af1ddbfda0725ab0e4a215.jpeg"
            alt="Promotional banner"
          />
        </div>
        <div className="cart__element">
          <div className="cart__color"></div>
          <div className="cart__title">Your Shopping Cart</div>
        </div>

        <div className="wishlist__grid">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div key={index} className="wishlist__container">
                <div className="delete__image__wishlist">
                  <img
                    className="img__product__wishlist"
                    src={item?.image[0]}
                    alt={item?.name}
                    style={{ width: "150px", height: "150px" }}
                  />
                </div>
                <div className="product__details__wishlist">
                  <p className="name__product__wishlist">{item?.name}</p>
                  <p className="price__product__wishlist">${item?.price}</p>
                  <p className="category__product__wishlist">
                    {item?.category}
                  </p>
                </div>
                <button
                  className="pannier__button__wishlist"
                  onClick={() => removeFromCart(item.id)}
                >
                  Supprimez du pannier
                </button>
              </div>
            ))
          ) : (
            <div>Aucun produit dans votre panier</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
