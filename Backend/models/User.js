const { Sequelize } = require("sequelize");
const sequelize = require("../config/db");
const crypto = require('crypto');

const User = sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => crypto.randomBytes(6).toString("hex"),
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      required: [true, "Please enter an email"],
      lowercase: true,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      required: [true, "Please enter a valid password"],
    },
    register_date: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    timestamps: true,
  }
);

sequelize
  .sync()
  .then(() => {
    console.log("users table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

module.exports = User;
