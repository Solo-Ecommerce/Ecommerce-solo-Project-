// module.exports = (sequelize, DataTypes) => {
//   const Payment = sequelize.define("Payment", {
//     paymentId: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     amount: {
//       type: DataTypes.DECIMAL(10, 2),
//       allowNull: false,
//     },
//     currency: {
//       type: DataTypes.STRING(3),
//       allowNull: false,
//     },
//     paymentIntentId: {
//       type: DataTypes.STRING, // Payment gateway ID
//       allowNull: false,
//     },
//     status: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     userId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: "users", // 'users' matches the table name in the User model
//         key: "id",
//       },
//       allowNull: false,
//     },
//   });

//   return Payment;
// };

module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define("Payment", {
    paymentId: {
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
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Carts",
        key: "cartId",
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "failed"),
      allowNull: false,
      defaultValue: "pending",
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Payment;
};
