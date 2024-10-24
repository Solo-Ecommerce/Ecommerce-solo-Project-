const { Wishlist, Product } = require("../indexdatabase");

// Add a product to the wishlist
exports.addToWishlist = async (req, res) => {
  const { productId } = req.params;
  const { userId } = req.body;

  try {
    // Check if the product already exists in the wishlist
    const existingItem = await Wishlist.findOne({
      where: { userId, productId },
    });

    if (existingItem) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    // Add the product to the wishlist
    const wishlistItem = await Wishlist.create({ userId, productId });
    res.status(201).json(wishlistItem);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add product to wishlist", error });
  }
};

// Get the user's wishlist
exports.getWishlist = async (req, res) => {
  const { userId } = req.params;

  try {
    const wishlist = await Wishlist.findAll({
      where: { userId },
      include: [
        {
          model: Product,
          attributes: [
            "productId",
            "name",
            "price",
            "images",
            "description",
            "category",
            "averageRating",
            "ratingsCount",
          ],
        },
      ],
    });

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve wishlist", error });
  }
};

// Remove a product from the wishlist
exports.removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const deletedItem = await Wishlist.destroy({
      where: { userId, productId },
    });

    if (!deletedItem) {
      return res.status(404).json({ message: "Product not found in wishlist" });
    }

    res.status(200).json({ message: "Product removed from wishlist" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to remove product from wishlist", error });
  }
};
