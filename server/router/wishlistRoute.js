const express = require("express");
const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controller/wishlistController");

const routeWishlist = express.Router();

routeWishlist.post("/addwishlist/:productId", addToWishlist);
routeWishlist.get("/getWishlist/:userId", getWishlist);
routeWishlist.delete("/deletewishlist/:userId/:productId", removeFromWishlist);

module.exports = routeWishlist;
