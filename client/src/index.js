import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StateContext } from "./component/StateProvider";
import { StateProvider } from "./component/StateProvider";
import reducer, { initialState } from "./component/reducer";
// import { Provider } from "react-redux"; // Import Provider from react-redux
// import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
// import { persistor } from "./store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  //   <Provider initialState={initialState} reducer={reducer}>
  //     {" "}
  //     {/* Provide the store to the app */}
  //     <PersistGate loading={null} persistor={persistor}>
  //       <App />
  //     </PersistGate>
  //   </Provider>
  //   ,
  // </React.StrictMode>

  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>
);

export const useStateValue = () => useContext(StateContext);
