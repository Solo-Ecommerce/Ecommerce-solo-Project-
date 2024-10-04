import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/home/Home";
import SignIn from "./component/signIn/SignIn";
import Navbar from "./component/navbar/Navbar";
import Login from "./component/login/Login";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
