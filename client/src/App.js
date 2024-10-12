import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./component/home/Home";
import SignIn from "./component/signIn/SignIn";
import Navbar from "./component/navbar/Navbar";
import Login from "./component/login/Login";
import AdminHomePage from "./component/adminHomePage/AdminHomePage";
import AddProducts from "./component/addProducts/AddProducts";
import UpdateProducts from "./component/updateProducts/UpdateProducts";

function App() {
  const location = useLocation();
  const [clickedElem, setClickedElem] = useState("");

  console.log("Current location:", location.pathname);

  const handleClickSelectedElem = (clickedId) => {
    setClickedElem(clickedId);
  };

  return (
    <div>
      {!location.pathname.includes("admin") &&
        !location.pathname.includes("addProducts") &&
        !location.pathname.includes("updateproducts") && <Navbar />}

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/adminhomepage"
            element={
              <AdminHomePage
                handleClickSelectedElem={handleClickSelectedElem}
              />
            }
          />
          <Route path="/addProducts" element={<AddProducts />} />
          <Route
            path="/updateproducts"
            element={<UpdateProducts clickedElem={clickedElem} />}
          />
        </Routes>
      </div>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
