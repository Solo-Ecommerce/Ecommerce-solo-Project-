import React from "react";

function useCart() {
  const [{ cart }, dispatch] = useStateValue();
  const [showPopup, setShowPopup] = useState(false);

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
    dispatch({
      type: "DECREASE_ITEM_QUANTITY",
      id: id,
    });
  };

  const handlePaymentClick = () => {
    setShowPopup(true);
  };
  return {
    cart,
    totalPrice,
  };
}

export default useCart;
