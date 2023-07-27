const { Sequelize } = require("sequelize");
const sequelize = require("../config/db");
const crypto = require("crypto");
const CartItem = sequelize.define(
  "cartItem",
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
    cartId: {
      type: Sequelize.STRING,
    },
    productId: {
        type: Sequelize.STRING,
      },
    itemName: {
      type: Sequelize.STRING,
    },
    quantity: {
        type: Sequelize.INTEGER,
      },
    price: {
        type: Sequelize.FLOAT,
    }
  },
  {
    tableName: "cartItem",
    timestamps: true,
  }
);
sequelize
  .sync()
  .then(() => {
    console.log("CartItem table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

module.exports = CartItem;
