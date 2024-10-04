// module.exports = (sequelize, DataTypes) => {
//   const Wishlist = sequelize.define("Wishlist", {
//     wishlistId: {
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
//     productId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: "products",
//         key: "id",
//       },
//       allowNull: false,
//     },
//   });

//   return Wishlist;
// };
