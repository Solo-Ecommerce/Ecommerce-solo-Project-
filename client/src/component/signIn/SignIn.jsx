// import React, { useState } from "react";
// import "../../index.css";
// import phone from "../../images/phone.png";
// import { useNavigate } from "react-router-dom";
// import "./SignIn.css";
// import google from "../../images/google.png";
// import axios from "axios";

// function SignIn() {
//   const [name, setName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [email, setEmail] = useState("");
//   const [adress, setAdress] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [birthDate, setBirthDate] = useState("");
//   const navigate = useNavigate();

//   const handleChangeName = (e) => {
//     setName(e.target.value);
//   };
//   const handleChangeLastName = (e) => {
//     setLastName(e.target.value);
//   };
//   const handleChangeEmail = (e) => {
//     setEmail(e.target.value);
//   };
//   const handleChangePhoneNumber = (e) => {
//     setPhoneNumber(e.target.value);
//   };
//   const handleChangeAdress = (e) => {
//     setAdress(e.target.value);
//   };
//   const handleChangePassword = (e) => {
//     setPassword(e.target.value);
//   };
//   const handleChangeConfirmPassword = (e) => {
//     setConfirmPassword(e.target.value);
//   };
//   const handleChangeBirthDate = (e) => {
//     setBirthDate(e.target.value);
//   };

//   const handleCreateAccount = () => {
//     if (password !== confirmPassword) {
//       console.log("Password do not match");
//       return;
//     } else {
//       axios
//         .post(`http://localhost:3000/users/signIn`, {
//           name,
//           lastName,
//           phoneNumber,
//           email,
//           adress,
//           password,
//           birthDate,
//         })
//         .then((res) => {
//           localStorage.setItem("user", res.data.token);
//           navigate("/");
//         })
//         .catch((error) => {
//           console.log(error);
//           throw error;
//         });
//     }
//   };

//   return (
//     <div className="signIn__container">
//       <div className="navbar__img">
//         <img src={phone} alt="phone__img" />
//       </div>

//       <div className="navbar__details">
//         <div>
//           <h3 className="navbar__title">Create an account</h3>
//           <p className="navbar__details__below">Enter your details below</p>
//         </div>

//         <div className="enter__details__signin">
//           {""}
//           <div className="detail__1__singnin">
//             <input
//               className="navbar__name inputStyle"
//               type="text"
//               placeholder="Name"
//               onChange={handleChangeName}
//             />
//             <input
//               className="navbar__last__name inputStyle"
//               type="text"
//               placeholder="Last Name"
//               onChange={handleChangeLastName}
//             />
//             <input
//               className="navbar__mobile__number inputStyle"
//               type="text"
//               placeholder="Mobile number"
//               onChange={handleChangePhoneNumber}
//             />
//             <input
//               className="navbar__adress inputStyle"
//               type="text"
//               placeholder="Adress"
//               onChange={handleChangeAdress}
//             />
//             <button
//               className="button__signin inputStyle"
//               onClick={handleCreateAccount}
//             >
//               Create an account
//             </button>
//             <div className="google__icon__icon__signin">
//               <button className="button__google ">
//                 <img
//                   className="google__icon__signin"
//                   src={google}
//                   alt="google"
//                 />
//                 Sign up with google
//               </button>
//             </div>
//             <div className="button__haveaccount inputStyle">
//               <p>Already have an account?</p>
//               <a className="singn__login" href="/login">
//                 Log in
//               </a>
//             </div>
//           </div>
//           {""}
//           <div className="detail__2__singnin">
//             <input
//               className="navbar__password inputStyle"
//               type="text"
//               placeholder="Password"
//               onChange={handleChangePassword}
//             />
//             <input
//               className="navbar__confirm__password inputStyle"
//               type="text"
//               placeholder="Confirm password"
//               onChange={handleChangeConfirmPassword}
//             />
//             <input
//               className="navbar__birth__date inputStyle"
//               type="text"
//               placeholder="Birth date"
//               onChange={handleChangeBirthDate}
//             />
//             <input
//               className="navbar__email inputStyle"
//               type="text"
//               placeholder="Email"
//               onChange={handleChangeEmail}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignIn;

import React, { useState } from "react";
import "../../index.css";
import phone from "../../images/phone.png";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import google from "../../images/google.png";
import axios from "axios";

function SignIn() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [adress, setAdress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleChangeAdress = (e) => {
    setAdress(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleChangeBirthDate = (e) => {
    setBirthDate(e.target.value);
  };

  const handleCreateAccount = () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    } else {
      axios
        .post(`http://localhost:3000/users/signIn`, {
          name,
          lastName,
          phoneNumber,
          email,
          adress,
          password,
          birthDate,
        })
        .then((res) => {
          localStorage.setItem("user", res.data.token);
          navigate("/");
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            setErrorMessage(error.response.data.message); // Set error message from backend
          } else {
            setErrorMessage("An unexpected error occurred.");
          }
        });
    }
  };

  return (
    <div className="signIn__container">
      <div className="navbar__img">
        <img src={phone} alt="phone__img" />
      </div>

      <div className="navbar__details">
        <div>
          <h3 className="navbar__title">Create an account</h3>
          <p className="navbar__details__below">Enter your details below</p>
        </div>

        {/* Display error message */}
        {errorMessage && (
          <p className="login__error__message">{errorMessage}</p>
        )}

        <div className="enter__details__signin">
          <div className="detail__1__singnin">
            <input
              className="navbar__name inputStyle"
              type="text"
              placeholder="Name"
              onChange={handleChangeName}
            />
            <input
              className="navbar__last__name inputStyle"
              type="text"
              placeholder="Last Name"
              onChange={handleChangeLastName}
            />
            <input
              className="navbar__mobile__number inputStyle"
              type="text"
              placeholder="Mobile number"
              onChange={handleChangePhoneNumber}
            />
            <input
              className="navbar__adress inputStyle"
              type="text"
              placeholder="Adress"
              onChange={handleChangeAdress}
            />
            <button
              className="button__signin inputStyle"
              onClick={handleCreateAccount}
            >
              Create an account
            </button>
            <div className="google__icon__icon__signin">
              <button className="button__google">
                <img
                  className="google__icon__signin"
                  src={google}
                  alt="google"
                />
                Sign up with google
              </button>
            </div>
            <div className="button__haveaccount inputStyle">
              <p>Already have an account?</p>
              <a className="singn__login" href="/login">
                Log in
              </a>
            </div>
          </div>

          <div className="detail__2__singnin">
            <input
              className="navbar__password inputStyle"
              type="text"
              placeholder="Password"
              onChange={handleChangePassword}
            />
            <input
              className="navbar__confirm__password inputStyle"
              type="text"
              placeholder="Confirm password"
              onChange={handleChangeConfirmPassword}
            />
            <input
              className="navbar__birth__date inputStyle"
              type="text"
              placeholder="Birth date"
              onChange={handleChangeBirthDate}
            />
            <input
              className="navbar__email inputStyle"
              type="text"
              placeholder="Email"
              onChange={handleChangeEmail}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
