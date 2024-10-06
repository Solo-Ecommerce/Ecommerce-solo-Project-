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
      allowNull: false,
      validate: {
        isArrayOfImages(value) {
          if (!Array.isArray(value)) {
            throw new Error("Images must be an array.");
          }
          if (value.length < 3) {
            throw new Error("At least 3 images are required.");
          }
          value.forEach((url) => {
            if (typeof url !== "string") {
              throw new Error("Each image URL must be a string.");
            }
          });
        },
      },
    },
    category: {
      type: DataTypes.ENUM(
        "Soins de la peau",
        "Soins des cheveux",
        "Soins des yeux",
        "Soins des pieds",
        "Cosmétiques"
      ),
      allowNull: false,
    },
    averageRating: {
      type: DataTypes.DECIMAL(3, 2),
      defaultValue: 1.0, // Set default to 1.0 to meet min validation
      validate: {
        min: 1.0,
        max: 5.0,
      },
    },

    ratingsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  return Product;
};
