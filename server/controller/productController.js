require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { Product } = require("../indexdatabase");

const isValidImageUrl = (url) => {
  const urlPattern = new RegExp(
    /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg|bmp|tiff))$/i
  );
  return urlPattern.test(url);
};

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
  console.log(
    "hhhhhhhhhhhhhhhh",
    process.env.CLOUDINARY_CLOUD_NAME,
    process.env.CLOUDINARY_API_KEY,
    process.env.CLOUDINARY_API_SECRET
  );
  try {
    const { name, description, price, category, images } = req.body;

    if (!images || !Array.isArray(images) || images.length < 3) {
      return res.status(400).send("At least 3 images are required.");
    }

    const invalidUrls = images.filter((image) => !isValidImageUrl(image));
    if (invalidUrls.length > 0) {
      return res
        .status(400)
        .send(`Invalid image URLs detected: ${invalidUrls.join(", ")}`);
    }

    // Inline Cloudinary configuration during upload
    const uploadedPromises = images.map((image) =>
      cloudinary.uploader.upload(image, {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        resource_type: "auto",
      })
    );

    const uploadedResults = await Promise.all(uploadedPromises);
    console.log("uploaded images:", uploadedResults);

    const newarray = uploadedResults.map((el) => el.secure_url);
    console.log("new array", newarray);

    const newProduct = await Product.create({
      name,
      description,
      price,
      category,
      images: newarray,
    });

    res.status(201).send({
      message: "Product created successfully",
      productId: newProduct.id,
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
        images.map((image) =>
          cloudinary.uploader.upload(image, {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            resource_type: "auto",
          })
        )
      );
      console.log("hellllllllll", images);
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
