// module.exports = (sequelize, DataTypes) => {
//   const Order = sequelize.define("order", {
//     orderId: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     userId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: "users",
//         key: "id",
//       },
//       allowNull: false,
//     },
//     status: {
//       type: DataTypes.ENUM("pending", "shipped", "delivered"),
//       allowNull: false,
//       defaultValue: "pending",
//     },
//     totalPrice: {
//       type: DataTypes.DECIMAL(10, 2),
//       allowNull: false,
//     },
//     paymentId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: "payments",
//         key: "id",
//       },
//       allowNull: false,
//     },
//   });

//   return Order;
// };
