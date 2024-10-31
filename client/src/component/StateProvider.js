// setUp the data layer
// we Need this to track the cart

import React, { createContext, useContext, useReducer } from "react";

//this is the data layout

export const StateContext = createContext();
// Build a Provider
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
