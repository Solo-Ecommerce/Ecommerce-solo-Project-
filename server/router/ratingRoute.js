const express = require("express");
const {
  createRating,
  getProductRatings,
  getAverageRating,
  deleteRating,
} = require("../controller/ratingController");
const routeRating = express.Router();

routeRating.post("/createRating", createRating);
routeRating.get("/getAllProductRatings/:productId", getProductRatings);
routeRating.get("/getAllAverageRating/:productId", getAverageRating);
routeRating.delete("/deleteRating/:id", deleteRating);

module.exports = routeRating;
