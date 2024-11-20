// module.exports = (sequelize, DataTypes) => {
//   const OrderProduct = sequelize.define("OrderProduct", {
//     paymentId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: "Payments",
//         key: "paymentId",
//       },
//     },
//     productId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: "Products",
//         key: "productId",
//       },
//     },
//     quantity: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       defaultValue: 1,
//     },
//   });

//   return OrderProduct;
// };

module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define("OrderProduct", {
    orderProductId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "userId",
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
      validate: {
        min: 1,
      },
    },
    priceAtPurchase: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    orderStatus: {
      type: DataTypes.ENUM,
      values: ["process", "success", "complete"],
      allowNull: false,
      defaultValue: "process", // Default status is 'process'
    },
  });

  return OrderProduct;
};
