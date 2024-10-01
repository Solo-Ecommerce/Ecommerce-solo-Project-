const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config/config.json");
const payment = require("./model/payment.js");

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: "localhost",
  dialect: "mysql",
});

const User = require("./model/user.js")(sequelize, DataTypes);
const Product = require("./model/product.js")(sequelize, DataTypes);
const Wishlist = require("./model/wishlist.js")(sequelize, DataTypes);
const Rating = require("./model/rating.js")(sequelize, DataTypes);
const Payment = require("./model/payment.js")(sequelize, DataTypes);

// Define Associations

// 1. User and Payment Relationship
Payment.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Payment, { foreignKey: "userId" });

// 2. Product and Payment Relationship
Payment.belongsTo(Product, { foreignKey: "productId", onDelete: "CASCADE" });
Product.hasMany(Payment, { foreignKey: "productId" });

// 3. User and Rating Relationship
Rating.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Rating, { foreignKey: "userId" });

// 4. Product and Rating Relationship
Rating.belongsTo(Product, { foreignKey: "productId", onDelete: "CASCADE" });
Product.hasMany(Rating, { foreignKey: "productId" });

// 5. User and Wishlist Relationship (Many-to-Many through Wishlist)
User.belongsToMany(Product, { through: Wishlist, foreignKey: "userId" });
Product.belongsToMany(User, { through: Wishlist, foreignKey: "productId" });

sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully"))
  .catch((error) => console.log("unable to connect to the database", error));
sequelize
  .sync({ alter: true })
  .then(() => console.log("database and table created successfully"))
  .catch((error) => console.log("error sync", error));

module.exports = {
  Sequelize,
  sequelize,
  User,
  Product,
  Wishlist,
  Rating,
  Payment,
};
