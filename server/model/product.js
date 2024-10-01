module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      ProductId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      images: {
        type: DataTypes.JSON,
        allowNull: true,
        validate: {
          isArrayOfImages(value) {
            if (Array.isArray(value)) {
              if (value.length > 4) {
                throw new Error("You can only upload up to 4 images.");
              }
              value.forEach((url) => {
                if (typeof url !== "string") {
                  throw new Error("Each image URL must be a string.");
                }
              });
            } else {
              throw new Error("Images must be an array.");
            }
          },
        },
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "products",
      timestamps: true,
    }
  );
  return Product;
};
