// const { Sequelize, DataTypes } = require("sequelize");
// const config = require("./config/config.json");

// const sequelize = new Sequelize(config.database, config.user, config.password, {
//   host: "localhost",
//   dialect: "mysql",
// });

// const User = require("./model/user.js")(sequelize, DataTypes);
// const Product = require("./model/product.js")(sequelize, DataTypes);
// const Wishlist = require("./model/wishlist.js")(sequelize, DataTypes);
// const Rating = require("./model/rating.js")(sequelize, DataTypes);
// const Payment = require("./model/payment.js")(sequelize, DataTypes);
// const Order = require("./model/order.js")(sequelize, DataTypes); // Changed from Commande to Order
// const OrderProduct = require("./model/orderProduct.js")(sequelize, DataTypes); // Join Table

// // User relations
// User.hasMany(Order, { foreignKey: "userId" });
// User.hasMany(Payment, { foreignKey: "userId" });
// User.hasMany(Wishlist, { foreignKey: "userId" });

// // Product relations
// Product.hasMany(Wishlist, { foreignKey: "productId" });
// Product.belongsToMany(Order, {
//   through: OrderProduct,
//   foreignKey: "productId",
// }); // Reference to Order

// // Wishlist relations
// Wishlist.belongsTo(User, { foreignKey: "userId" });
// Wishlist.belongsTo(Product, { foreignKey: "productId" });

// // Order relations
// Order.belongsTo(User, { foreignKey: "userId" });
// Order.belongsToMany(Product, { through: OrderProduct, foreignKey: "orderId" });
// Order.belongsTo(Payment, { foreignKey: "paymentId" });

// // Payment relations
// Payment.belongsTo(User, { foreignKey: "userId" });
// Payment.hasOne(Order, { foreignKey: "paymentId" }); // Reference to Order

// sequelize
//   .authenticate()
//   .then(() => console.log("Connection has been established successfully"))
//   .catch((error) => console.log("unable to connect to the database", error));

// sequelize
//   .sync({ alter: true })
//   .then(() => console.log("Database and tables created successfully"))
//   .catch((error) => console.log("Error syncing", error));

// module.exports = {
//   Sequelize,
//   sequelize,
//   User,
//   Product,
//   Wishlist,
//   Rating,
//   Payment,
//   Order,
//   OrderProduct,
// };

const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config/config.json");

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: "localhost",
  dialect: "mysql",
});

const User = require("./model/user.js")(sequelize, DataTypes);
const Product = require("./model/product.js")(sequelize, DataTypes);
const Rating = require("./model/rating.js")(sequelize, DataTypes);

// User relations
User.hasMany(Rating, { foreignKey: "userId" }); // A user can rate multiple products
User.hasMany(Rating, { foreignKey: "userId" });

// Product relations
Product.hasMany(Rating, { foreignKey: "productId" }); // A product can be rated by multiple users

// Rating relations
Rating.belongsTo(User, { foreignKey: "userId" }); // A rating belongs to a user
Rating.belongsTo(Product, { foreignKey: "productId" }); // A rating belongs to a product

sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully"))
  .catch((error) => console.log("unable to connect to the database", error));

sequelize
  .sync({ alter: true })
  .then(() => console.log("Database and tables created successfully"))
  .catch((error) => console.error("Error syncing database:", error));

module.exports = {
  Sequelize,
  sequelize,
  User,
  Product,
  Rating,
};
