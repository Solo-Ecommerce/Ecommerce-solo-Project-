module.exports = (sequelize, DataTypes) => {
  const Wishlist = sequelize.define("Wishlist", {
    wishlistId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "userId",
      },
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Products",
        key: "productId",
      },
      allowNull: false,
    },
  });

  return Wishlist;
};
