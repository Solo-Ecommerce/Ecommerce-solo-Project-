import React, { useState } from "react";
import "../../index.css";
import phone from "../../images/phone.png";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import google from "../../images/google.png";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function SignIn() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [adress, setAdress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
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
      console.log("Password do not match");
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
          const token = res.data.token;

          // Decode the JWT token to extract the user data
          const decoded = jwtDecode(token);
          const userId = decoded.id;
          // Store necessary user details and the token in localStorage
          const userData = {
            token,
            userId,
            name: decoded.name,
            lastName: decoded.lastName,
            phoneNumber: decoded.phoneNumber,
            email: decoded.email,
            adress: decoded.adress,
            birthDate: decoded.birthDate,
            role: decoded.role,
          };

          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("token", token);

          console.log("Decoded token:", decoded);
          console.log("Server response:", res.data);
          console.log("Server response:", res.data);
          console.log("nchalah keeeeeeeeeeeeeeeeen", userId); // Check the user ID output
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          throw error;
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

        <div className="enter__details__signin">
          {""}
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
              <button className="button__google ">
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
          {""}
          <div className="detail__2__singnin">
            <input
              className="navbar__password inputStyle"
              type="password"
              placeholder="Password"
              onChange={handleChangePassword}
            />
            <input
              className="navbar__confirm__password inputStyle"
              type="password"
              placeholder="Confirm password"
              onChange={handleChangeConfirmPassword}
            />
            <input
              className="navbar__birth__date inputStyle"
              type="date"
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

// import React, { useState } from "react";
// import "../../index.css";
// import phone from "../../images/phone.png";
// import { useNavigate } from "react-router-dom";
// import "./SignIn.css";
// import google from "../../images/google.png";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";

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

//   const handleChangeName = (e) => setName(e.target.value);
//   const handleChangeLastName = (e) => setLastName(e.target.value);
//   const handleChangeEmail = (e) => setEmail(e.target.value);
//   const handleChangePhoneNumber = (e) => setPhoneNumber(e.target.value);
//   const handleChangeAdress = (e) => setAdress(e.target.value);
//   const handleChangePassword = (e) => setPassword(e.target.value);
//   const handleChangeConfirmPassword = (e) => setConfirmPassword(e.target.value);
//   const handleChangeBirthDate = (e) => setBirthDate(e.target.value);

//   const handleCreateAccount = () => {
//     if (password !== confirmPassword) {
//       console.log("Passwords do not match");
//       return;
//     }

//     axios
//       .post(`http://localhost:3000/users/signin`, {
//         name,
//         lastName,
//         phoneNumber,
//         email,
//         adress,
//         password,
//         birthDate,
//       })
//       .then((res) => {
//         // Convert token to a string to avoid InvalidTokenError
//         const token = String(res.data.token);

//         // Decode the token to get userId
//         const decoded = jwtDecode(token);
//         const userId = decoded.id;

//         // Store user details and token in local storage
//         const userData = {
//           token,
//           userId,
//           name,
//           lastName,
//           phoneNumber,
//           email,
//           adress,
//           birthDate,
//         };
//         localStorage.setItem("user", JSON.stringify(userData));
//         localStorage.setItem("token", token);
//         localStorage.setItem("userId", userId);

//         console.log("Decoded token:", decoded);
//         console.log("Server response:", res.data);

//         navigate("/");
//       })
//       .catch((error) => {
//         console.error("Error during account creation:", error);
//       });
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
//               placeholder="Address"
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
//                 Sign up with Google
//               </button>
//             </div>
//             <div className="button__haveaccount inputStyle">
//               <p>Already have an account?</p>
//               <a className="singn__login" href="/login">
//                 Log in
//               </a>
//             </div>
//           </div>

//           <div className="detail__2__singnin">
//             <input
//               className="navbar__password inputStyle"
//               type="password"
//               placeholder="Password"
//               onChange={handleChangePassword}
//             />
//             <input
//               className="navbar__confirm__password inputStyle"
//               type="password"
//               placeholder="Confirm password"
//               onChange={handleChangeConfirmPassword}
//             />
//             <input
//               className="navbar__birth__date inputStyle"
//               type="date"
//               placeholder="Birth date"
//               onChange={handleChangeBirthDate}
//             />
//             <input
//               className="navbar__email inputStyle"
//               type="email"
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
