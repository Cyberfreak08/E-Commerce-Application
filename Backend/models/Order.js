const { Sequelize } = require("sequelize");
const sequelize = require("../config/db");
const crypto = require("crypto");
const User = require("./User");
const Order = sequelize.define(
  "order",
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => crypto.randomBytes(6).toString("hex"),
    },
    userId: {
      type: Sequelize.STRING,
    },
    items: {
      type: Sequelize.STRING,
    },
    date_ordered: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    billAmount: {
      type: Sequelize.FLOAT,
    },
  },
  {
    tableName: "order",
    timestamps: true,
  }
);
Order.belongsTo(User, { as: "order", foreignKey: "userId" });

sequelize
  .sync()
  .then(() => {
    console.log("Order table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

module.exports = Order;
