// module.exports = (sequelize, DataTypes) => {
//   const Payment = sequelize.define("Payment", {
//     paymentId: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     userId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: "Users",
//         key: "userId",
//       },
//     },
//     amount: {
//       type: DataTypes.DECIMAL(10, 2),
//       allowNull: false,
//     },
//     status: {
//       type: DataTypes.ENUM("pending", "completed", "failed"),
//       allowNull: false,
//       defaultValue: "pending",
//     },
//     paymentMethod: {
//       type: DataTypes.ENUM("cash", "stripe"),
//       allowNull: false,
//     },
//   });

//   return Payment;
// };
