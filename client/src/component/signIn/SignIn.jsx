import React from "react";
import "../../index.css";
import phone from "../../images/phone.png";
import "./SignIn.css";
import google from "../../images/google.png";
// className="flex items-center justify-center h-screen bg-red-100"
function SignIn() {
  return (
    <div className="signIn__container">
      <div className="navbar__img">
        <img src={phone} alt="image" />
      </div>
      <div></div>

      <div className="navbar__details">
        <div>
          <h3 className="navbar__title">Create an account</h3>
          <p className="navbar__details__below">Enter your details below</p>
        </div>

        <input
          className="navbar__name inputStyle"
          type="text"
          placeholder="Name"
        />
        <input
          className="navbar__email inputStyle"
          type="text"
          placeholder="Email or mobile phone"
        />
        <input
          className="navbar__password inputStyle"
          type="text"
          placeholder="Password"
        />
        <button className="button__signin inputStyle">Create an account</button>
        <div className="google__icon__icon__signin">
          <button className="button__google ">
            <img className="google__icon__signin" src={google} alt="google" />
            Sign up with google
          </button>
        </div>
        <div className="button__haveaccount inputStyle">
          <a>Already have an account?</a>
          <a className="singn__login" href="Login">
            Log in
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
