module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    "rating",
    {
      value: {
        type: DataTypes.FLOAT,
        validate: {
          min: 1.0,
          max: 5.0,
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "products", key: "id" },
      },
    },
    {
      tableName: "ratings",
      timestamps: true,
    }
  );
  return Rating;
};
