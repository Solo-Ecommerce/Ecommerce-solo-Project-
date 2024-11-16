import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StateContext } from "./component/StateProvider";
import { StateProvider } from "./component/StateProvider";
import reducer, { initialState } from "./component/reducer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>
);

export const useStateValue = () => useContext(StateContext);
