const { Sequelize } = require("sequelize");
const sequelize = require("../config/db");
const crypto = require("crypto");
const Item = sequelize.define(
  "items",
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => crypto.randomBytes(6).toString("hex"),
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    date_added: {
      type: Sequelize.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    tableName: "items",
    timestamps: true,
  }
);

sequelize
  .sync()
  .then(() => {
    console.log("Items table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

module.exports = Item;
