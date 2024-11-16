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
import ProductDetails from "./component/productDetails/ProductDetails";
import Categories from "./component/categories/Categories";
import SoinsPeau from "./component/soinsPeau/SoinsPeau";
import SoinsCheveux from "./component/soinsCheveux/SoinsCheveux";
import SoinsYeux from "./component/soinsYeux/SoinsYeux";
import SoinsPieds from "./component/soinsPieds/SoinsPieds";
import Cosmetiques from "./component/soinsCosmetique/Cosmetiques";
import WishList from "./component/wishList/WishList";
import Cart from "./component/cart/Cart";
import PayementCancel from "./component/paymentCancel/PayementCancel";

function App() {
  const location = useLocation();
  const [clickedElem, setClickedElem] = useState("");
  const [clickedProductDetail, setClickedProductDetail] = useState(0);
  const [clickedElemCategory, setClickedELemCategory] = useState("");
  const [productWishlist, setProductWishlist] = useState(0);

  const handleClickSelectedElem = (clickedId) => {
    setClickedElem(clickedId);
  };
  const handleClickProdDetails = (clickedProdId) => {
    setClickedProductDetail(clickedProdId);
  };
  const handleGetProductByCategory = (clickedCategory) => {
    setClickedELemCategory(clickedCategory);
  };
  const handleClickProductWishlist = (clickedProductWishlistId) => {
    setProductWishlist(clickedProductWishlistId);
  };

  return (
    <div>
      {!location.pathname.includes("admin") &&
        !location.pathname.includes("addProducts") &&
        !location.pathname.includes("updateproducts") && <Navbar />}

      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                handleClickProdDetails={handleClickProdDetails}
                SendCategory={handleGetProductByCategory}
                handleClickProductWishlist={handleClickProductWishlist}
              />
            }
          />
          <Route path="/categories" element={<Categories />} />
          <Route
            path="/wishlist"
            element={<WishList productWishlist={productWishlist} />}
          />

          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/soinspeau" element={<SoinsPeau />} />
          <Route path="/cancelpayement" element={<PayementCancel />} />
          <Route
            path="/soinscheveux"
            element={<SoinsCheveux clickedElemCategory={clickedElemCategory} />}
          />
          <Route
            path="/soinsyeux"
            element={<SoinsYeux clickedElemCategory={clickedElemCategory} />}
          />
          <Route
            path="/soinspieds"
            element={<SoinsPieds clickedElemCategory={clickedElemCategory} />}
          />
          <Route
            path="/cosmetiques"
            element={<Cosmetiques clickedElemCategory={clickedElemCategory} />}
          />
          <Route
            path="/productdetails"
            element={<ProductDetails productDetailId={clickedProductDetail} />}
          />

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
          <Route path="/cart" element={<Cart />} />
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
