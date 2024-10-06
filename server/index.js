const express = require("express");
const cors = require("cors");
const userRoute = require("./router/userRoute");
const productRoute = require("./router/productRoute");
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

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
