import React, { useState } from "react";
import "../../index.css";
import phone from "../../images/phone.png";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import google from "../../images/google.png";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleLogin = () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    setErrorMessage("");

    axios
      .post("http://localhost:3000/users/login", { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        const decoded = jwtDecode(res.data.token);
        console.log("useeeer", decoded);
        if (decoded.role === "user") {
        } else {
          navigate("/adminHomePage");
        }
      })
      .catch((error) => {
        console.error(error);
        setLoginError("Incorrect email or password");
      });
  };

  return (
    <div className="signin__container">
      <div className="navbar__img">
        <img src={phone} alt="phone__img" />
      </div>

      <div className="login__details">
        <div>
          <h3 className="login__title">Log in to your account</h3>
        </div>

        <div className="enter__details__login">
          <div className="detail__2__singnin">
            <input
              className="inputStyle"
              type="text"
              placeholder="Email"
              onChange={handleChangeEmail}
            />
            <input
              className="inputStyle "
              type="text"
              placeholder="Password"
              onChange={handleChangePassword}
            />
            <input
              className="inputStyle"
              type="text"
              placeholder="Confirm password"
              onChange={handleChangeConfirmPassword}
            />

            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}

            {loginError && <div className="error-message">{loginError}</div>}
          </div>

          <div className="detail__1__singnin">
            <button className="button__signin inputStyle" onClick={handleLogin}>
              Log in
            </button>

            <div className="google__icon__icon__signin">
              <button className="button__google">
                <img
                  className="google__icon__signin"
                  src={google}
                  alt="google"
                />
                Sign up with Google
              </button>
            </div>

            <div className="button__haveaccount">
              <p>Already have an account?</p>
              <a className="singn__login" href="/login">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
