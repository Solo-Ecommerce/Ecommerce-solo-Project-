// setUp the data layer
// we Need this to track the cart

// import React, { createContext, useContext, useReducer } from "react";

//this is the data layout

// export const StateContext = createContext();
// Build a Provider
// export const StateProvider = ({ reducer, initialState, children }) => (
//   <StateContext.Provider value={useReducer(reducer, initialState)}>
//     {children}
//   </StateContext.Provider>
// );

import React, { createContext, useContext, useReducer, useEffect } from "react";

export const StateContext = createContext();

const loadStateFromLocalStorage = (key, defaultValue) => {
  try {
    const savedState = localStorage.getItem(key);
    return savedState ? JSON.parse(savedState) : defaultValue;
  } catch (error) {
    console.error("Could not load from localStorage", error);
    return defaultValue;
  }
};

const saveStateToLocalStorage = (key, state) => {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (error) {
    console.error("Could not save to localStorage", error);
  }
};

export const StateProvider = ({ reducer, initialState, children }) => {
  // Load the state from local storage, ensure cart is an array
  const loadedState = loadStateFromLocalStorage("cart", initialState);

  // Ensure loadedState.cart is an array
  const initialStateWithCart = {
    ...loadedState,
    cart: Array.isArray(loadedState.cart) ? loadedState.cart : [], // Fallback to an empty array if not an array
  };

  const [state, dispatch] = useReducer(reducer, initialStateWithCart);

  useEffect(() => {
    saveStateToLocalStorage("cart", state);
  }, [state]);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
