module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define("OrderProduct", {
    paymentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Payments",
        key: "paymentId",
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Products",
        key: "productId",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  });

  return OrderProduct;
};
