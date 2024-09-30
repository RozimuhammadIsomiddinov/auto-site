const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const sequelize = require("../../config/dbconfig.js");
const Mark = require("./carMark.js");

const Users = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    image: {
      type: DataTypes.STRING,
    },
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
    userrate: {
      type: DataTypes.ENUM("yearly", "monthly", "daily"),
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
