const express = require("express");
const {
  createOrderProduct,
  getOrderProductByUserId,
} = require("../controller/orderProductControlleur");

const orderProductRoute = express.Router();
orderProductRoute.post("/createorderproduct", createOrderProduct);
orderProductRoute.get("/getallorder/:userId", getOrderProductByUserId);

module.exports = orderProductRoute;
