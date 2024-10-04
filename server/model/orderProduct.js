// module.exports = (sequelize, DataTypes) => {
//   const OrderProduct = sequelize.define("OrderProduct", {
//     orderProductId: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     quantity: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     productId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: "products",
//         key: "id",
//       },
//       allowNull: false,
//     },
//     orderId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: "order",
//         key: "id",
//       },
//       allowNull: false,
//     },
//   });

//   return OrderProduct;
// };
