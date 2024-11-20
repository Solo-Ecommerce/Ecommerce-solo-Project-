import React, { useState, useEffect } from "react";
import MainNavbar from "../navbar/MainNavbar";
import { useStateValue } from "../../index";
import { FaTrash } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { CgRemoveR } from "react-icons/cg";
import "./Cart.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import StripeCheckout from "react-stripe-checkout";
import { createOrderProd } from "../service/orderProduct";

function Cart() {
  const [{ cart }, dispatch] = useStateValue();
  const [showPopup, setShowPopup] = useState(false);
  const [user, setUser] = useState(null);

  // Calculate total price
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const removeFromCart = (id) => {
    dispatch({
      type: "REMOVE_ITEM_FROM_CART",
      id: id,
    });
  };

  const increaseQuantity = (id) => {
    dispatch({
      type: "INCREASE_ITEM_QUANTITY",
      id: id,
    });
  };

  const decreaseQuantity = (id) => {
    const item = cart.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      dispatch({
        type: "DECREASE_ITEM_QUANTITY",
        id: id,
      });
    }
  };

  const handlePaymentClick = () => {
    setShowPopup(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
      console.log("hatha il user", user);
    }
  }, []);

  const makePaymentStripe = async (token) => {
    const body = {
      token,
      cart,
    };
    const headers = {
      // Authorization: `pk_test_51IVaFbFxjk8PDaTLln47UMO3u9PajFvc6GwhVkNnfTskkba8INc5zVqoobHVyLtFOkUzwMML7jMDRYrdBDhI3iKZ00HUPPYnom`,
      "Content-type": "application/json",
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/stripe/payment",
        body,
        { headers }
      );
      if (response.status === 200) {
        if (!user)
          throw new Error("User is not defined. Cannot create orders.");
        const orderPromises = cart.map((item) =>
          createOrderProd({
            userId: user.id,
            productId: item.id,
            quantity: item.quantity,
            priceAtPurchase: item.price,
            date: new Date().toISOString(),
            orderStatus: "complete",
          })
        );

        await Promise.all(orderPromises);

        console.log("All orders created successfully");
      }

      // Log the response status
      console.log("Response:", response);
      const { status } = response;
      console.log("Status:", status);
    } catch (err) {
      // Handle errors
      console.error("Error:", err);
    }
  };
  const formattedTotalPrice = parseFloat(totalPrice.toFixed(2));
  const amountInCents = Math.round(formattedTotalPrice * 100);
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
          <div className="cart__title">Votre panier</div>
        </div>
        <div className="wishlist__grid">
          {cart && cart.length > 0 ? (
            cart.map((item, index) => (
              <div key={index} className="wishlist__container">
                <div className="delete__image__wishlist">
                  <div className="image__trash__container">
                    <FaTrash
                      className="trash__cart"
                      onClick={() => removeFromCart(item.id)}
                    />
                    <img
                      className="img__product__wishlist"
                      src={
                        item.image && Array.isArray(item.image)
                          ? item.image[0]
                          : "default-image-url"
                      }
                      alt={item?.name}
                      style={{ width: "150px", height: "150px" }}
                    />
                  </div>
                </div>
                <div className="product__details__wishlist">
                  <p className="name__product__wishlist">{item?.name}</p>
                  <p className="price__product__wishlist">${item?.price}</p>
                  <p className="category__product__wishlist">
                    {item?.category}
                  </p>
                  <div className="quantity__controls">
                    <CgRemoveR
                      className="moins__icons__wishlist"
                      onClick={() => decreaseQuantity(item.id)}
                      disabled={item.quantity <= 1}
                    />
                    <span>{item?.quantity ? item.quantity : 1}</span>
                    <CiSquarePlus
                      className="plus__icons__wishlist"
                      onClick={() => increaseQuantity(item.id)}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty__cart">
              <p className="text__empty__cart">
                Ajouter des produits dans votre panier
              </p>
              <img
                className="empty__cart__shoping"
                src="https://cdn-icons-png.flaticon.com/512/5400/5400905.png"
                alt="shopping"
              />
            </div>
          )}
        </div>
        <button className="payement__cart" onClick={handlePaymentClick}>
          Payement
        </button>

        {/* Popup for total payment price */}
        {showPopup && (
          <div className="popup__overlay">
            <div className="popup__content">
              <h2 className=" total__payement__cart">Prix Totale</h2>
              <p>Total Price: ${totalPrice.toFixed(2)}</p>
              <button
                total__payement__cart__close
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
              <StripeCheckout
                stripeKey="pk_test_51IVaFbFxjk8PDaTLln47UMO3u9PajFvc6GwhVkNnfTskkba8INc5zVqoobHVyLtFOkUzwMML7jMDRYrdBDhI3iKZ00HUPPYnom"
                token={makePaymentStripe}
                amount={amountInCents.toFixed(2)}
              >
                <button className="total__payement__cart__online">
                  Payez avec votre carte
                </button>
              </StripeCheckout>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
