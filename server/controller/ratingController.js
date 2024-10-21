const { Rating, Product, User, sequelize } = require("../indexdatabase");

// Create a new rating for a product
const createRating = async (req, res) => {
  const { value, userId, productId } = req.body;

  try {
    // Ensure the rating value is between 1.0 and 5.0
    const validRating = Math.max(1.0, Math.min(value, 5.0));
    if (validRating !== value) {
      return res.status(400).json({
        message: "Rating value must be between 1.0 and 5.0",
      });
    }

    // Check if the product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the rating
    const rating = await Rating.create({
      value,
      userId,
      productId,
    });

    return res.status(201).json(rating);
  } catch (error) {
    console.error("Error creating rating:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get all ratings for a specific product
const getProductRatings = async (req, res) => {
  const { productId } = req.params;

  try {
    const ratings = await Rating.findAll({
      where: { productId },
      include: [
        {
          model: User,
          attributes: ["userId", "name"],
        },
      ],
    });

    if (!ratings.length) {
      return res
        .status(404)
        .json({ message: "No ratings found for this product" });
    }

    return res.status(200).json(ratings);
  } catch (error) {
    console.error("Error fetching product ratings:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get the average rating for a specific product
const getAverageRating = async (req, res) => {
  const { productId } = req.params;

  try {
    const ratingData = await Rating.findAll({
      where: { productId },
      attributes: [
        [sequelize.fn("AVG", sequelize.col("value")), "averageRating"],
      ],
    });

    const averageRating = ratingData[0]?.dataValues?.averageRating;

    if (!averageRating) {
      return res
        .status(404)
        .json({ message: "No ratings found for this product" });
    }

    return res.status(200).json({
      productId,
      averageRating: parseFloat(averageRating).toFixed(2), // Round to 2 decimal places
    });
  } catch (error) {
    console.error("Error fetching average rating:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete a rating by ID
const deleteRating = async (req, res) => {
  const { id } = req.params;

  try {
    const rating = await Rating.findByPk(id);
    if (!rating) {
      return res.status(404).json({ message: "Rating not found" });
    }

    await rating.destroy();
    return res.status(200).json({ message: "Rating deleted successfully" });
  } catch (error) {
    console.error("Error deleting rating:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createRating,
  getProductRatings,
  getAverageRating,
  deleteRating,
};
