const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const sequelize = require("../../config/dbconfig.js");

const Users = sequelize.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("customer", "seller"),
      allowNull: false,
      defaultValue: "customer",
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        try {
          user.password = await bcrypt.hash(user.password, 10);
        } catch (err) {
          console.error("Error hashing password:", err); // Log the error if hashing fails
        }
      },
    },
    timestamps: true,
  }
);

module.exports = Users;
