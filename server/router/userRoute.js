const express = require("express");
const {
  getAllusers,
  getOneUser,
  deleteUser,
  singnIn,
  loginUser,
  addUser,
} = require("../controller/userController.js");
const route = express.Router();

route.get("/getAllUsers", getAllusers);
route.get("/getOneUser/:id", getOneUser);
route.delete("/deleteUser/:id", deleteUser);
route.post("/signin", singnIn);
route.post("/login", loginUser);
route.post("/addUser", addUser);
module.exports = route;
