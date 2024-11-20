const express = require("express");
const cors = require("cors");
const userRoute = require("./router/userRoute");
const productRoute = require("./router/productRoute");
const ratingRoute = require("./router/ratingRoute");
const routeWishlist = require("./router/wishlistRoute");
const paymentRoute = require("./router/paymentRoute");
const orderProductRoute = require("./router/orderProductRoute");
const stripeRouter = require("./router/stripeRoute");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const stripe = require("stripe")(
  "pk_test_51IVaFbFxjk8PDaTLln47UMO3u9PajFvc6GwhVkNnfTskkba8INc5zVqoobHVyLtFOkUzwMML7jMDRYrdBDhI3iKZ00HUPPYnom"
);

const cloudinary = require("cloudinary").v2;
const PORT = 3000;
const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME_1,
  api_key: process.env.CLOUDINARY_API_KEY_1,
  api_secret: process.env.CLOUDINARY_API_SECRET_1,
});
app.use(express.json());
app.use(cors());

app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/rating", ratingRoute);
app.use("/wishlist", routeWishlist);
// app.use("/payment", paymentRoute);
app.use("/order", orderProductRoute);
app.use("/stripe", stripeRouter);

// app.use("/stripe", stripeRoute);

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
