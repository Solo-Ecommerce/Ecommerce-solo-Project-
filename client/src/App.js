import "./App.css";
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

function App() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/adminhomepage" &&
        location.pathname !== "/addProducts" && <Navbar />}

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminhomepage" element={<AdminHomePage />} />
          <Route path="/addProducts" element={<AddProducts />} />
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
