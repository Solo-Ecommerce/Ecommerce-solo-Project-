module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: true,
      validate: {
        isArrayOfImages(value) {
          if (
            !Array.isArray(value) ||
            value.some((url) => typeof url !== "string")
          ) {
            throw new Error("Images must be an array of strings.");
          }
        },
      },
    },
    category: {
      type: DataTypes.ENUM("sports", "electronics", "fashion", "beauty"),
      allowNull: false,
    },
    averageRating: {
      type: DataTypes.DECIMAL(3, 2),
      defaultValue: 0,
      validate: {
        min: 1.0,
        max: 5.0,
      },
    },
    ratingsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    // quantity: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
  });

  return Product;
};
