// export const initialState = {
//   cart: [],
// };

// const reducer = (state, action) => {
//   console.log(action);
//   switch (action.type) {
//     case "ADD_ITEM_TO_CART":
//       return { ...state, cart: [...state.cart, action.item] };

//     case "REMOVE_ITEM_FROM_CART":
//locgic to add items from cart
// return {
//   ...state,
//   cart: state.cart.filter((item) => item.id !== action.id),
// };
// default:
//   return state;

//this way is better , better performance

//       let newCart = [...state.cart];
//       let index = state.cart.findIndex((item) => item.id === action.id);
//       if (index >= 0) {
//         newCart.splice(index, 1);
//       } else {
//         console.warn(
//           "Vous ne pouviez pas supprimer ce produit, parce qu'il n'existe pas dans le pannier"
//         );
//       }

//     default:
//       return { ...state, cart: newCart };
//   }
// };
// export default reducer;

export const initialState = {
  cart: [],
};

const reducer = (state, action) => {
  {
    console.log("Action dispatched:", action);
  }
  switch (action.type) {
    case "ADD_ITEM_TO_CART":
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === action.item.id
      );

      if (existingItemIndex >= 0) {
        // If item exists in the cart, increment the quantity
        const newCart = [...state.cart];
        newCart[existingItemIndex].quantity += 1; // Increment quantity
        return { ...state, cart: newCart };
      } else {
        // If item doesn't exist, add it to the cart with quantity 1
        const itemWithQuantity = { ...action.item, quantity: 1 };
        return {
          ...state,
          cart: [...state.cart, itemWithQuantity],
        };
      }

    case "REMOVE_ITEM_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.id),
      };

    case "INCREASE_ITEM_QUANTITY":
      const incItemIndex = state.cart.findIndex(
        (item) => item.id === action.id
      );
      if (incItemIndex >= 0) {
        const incCart = [...state.cart];
        incCart[incItemIndex].quantity += 1; // Increment quantity
        return { ...state, cart: incCart };
      }
      return state;

    case "DECREASE_ITEM_QUANTITY":
      const decItemIndex = state.cart.findIndex(
        (item) => item.id === action.id
      );
      if (decItemIndex >= 0) {
        const decCart = [...state.cart];
        if (decCart[decItemIndex].quantity > 1) {
          decCart[decItemIndex].quantity -= 1; // Decrement quantity
          return { ...state, cart: decCart };
        } else {
          // If quantity is 1, remove the item from the cart
          return {
            ...state,
            cart: decCart.filter((item) => item.id !== action.id),
          };
        }
      }
      return state;

    default:
      return state;
  }
};

export default reducer;
