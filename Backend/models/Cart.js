const { Sequelize } = require("sequelize");
const sequelize = require("../config/db");
const crypto = require("crypto");
const User = require("./User");
const CartItem = require("./Cartitems");
const Cart = sequelize.define(
  "cart",
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
    bill: {
      type: Sequelize.FLOAT,
    },
  },
  {
    tableName: "cart",
    timestamps: true,
  }
);

Cart.belongsTo(User, { as: "customer", foreignKey: "userId" });
Cart.hasMany(CartItem, { as: "cartItem", foreignKey: "cartId" });

sequelize
  .sync()
  .then(() => {
    console.log("Cart table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

module.exports = Cart;
