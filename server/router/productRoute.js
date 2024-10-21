const express = require("express");
const {
  getAllProducts,
  getOneProduct,
  addProduct,
  deleteProduct,
  updateProduct,
  getAllProductsByCategory,
} = require("../controller/productController");
const routeProduct = express.Router();

routeProduct.get("/getAllProducts", getAllProducts);
routeProduct.get("/getOneProduct/:id", getOneProduct);
routeProduct.get("/getProductByCategory/:category", getAllProductsByCategory);
routeProduct.post("/addProduct", addProduct);
routeProduct.delete("/delete/:id", deleteProduct);
routeProduct.put("/update/:id", updateProduct);

module.exports = routeProduct;
