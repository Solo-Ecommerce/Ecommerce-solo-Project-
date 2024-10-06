const { Product } = require("../indexdatabase");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).send(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(404).send(error);
  }
};

const getOneProduct = async (req, res) => {
  try {
    const oneProduct = await Product.findByPk(req.params.id);
    res.status(200).send(oneProduct);
  } catch (error) {
    res.status(404).send(error);
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, images } = req.body;

    if (!images || !Array.isArray(images) || images.length < 3) {
      return res.status(400).send("At least 3 images are required.");
    }

    const uploadedPromises = images.map((image) =>
      cloudinary.uploader.upload(image, {})
    );

    const uploadedResults = await Promise.all(uploadedPromises);
    console.log("uploaded images:", uploadedResults);

    const newarray = uploadedResults.map((el) => el.secure_url);
    console.log("new array", newarray);

    // Create a new product with the uploaded images
    const newProduct = await Product.create({
      name,
      description,
      price,
      category,
      images: newarray, // Store the array of image URLs
    });

    // Send success response with product ID
    res.status(201).send({
      message: "Product created successfully",
      productId: newProduct.id, // Access the ID of the created product
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding the product");
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    await Product.destroy({
      where: {
        productId,
      },
    });
    res.status(200).send("Deleted product with id: " + productId);
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while deleting the product" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, images } = req.body;

  try {
    let imageUrls = [];

    if (images && Array.isArray(images) && images.length > 0) {
      const uploadedImages = await Promise.all(
        images.map((image) => cloudinary.uploader.upload(image))
      );
      imageUrls = uploadedImages.map(
        (uploadedImage) => uploadedImage.secure_url
      );
    }

    const [update] = await Product.update(
      {
        name,
        description,
        price,
        category,
        images: imageUrls.length > 0 ? imageUrls : undefined,
      },
      { where: { productId: id } }
    );

    if (update) {
      res.status(200).send("Product updated successfully");
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating the product");
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  addProduct,
  deleteProduct,
  updateProduct,
};
