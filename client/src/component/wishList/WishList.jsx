import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function WishList({ productWishlist }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    console.log(token);
    if (token) {
      const decoded = jwtDecode(token); // Decode the token
      setUser(decoded); // Store the decoded user
    }
  }, []);

  // useEffect(() => {
  //   if (user) {
  //     console.log("Decoded userrrrrrrrrrrr:"); // Log user when it's updated
  //   }
  // }, [user]);
  console.log(productWishlist);
  return <div>User: {productWishlist} </div>;
}

export default WishList;
