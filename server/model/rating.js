module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    "rating",
    {
      value: {
        type: DataTypes.FLOAT,
        validate: {
          min: 0.0,
          max: 5.0,
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "userId" },
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "products", key: "productId" },
      },
    },
    {
      tableName: "ratings",
      timestamps: true,
    }
  );
  return Rating;
};
