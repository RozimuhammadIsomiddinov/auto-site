import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "../../config/dbconfig.js";
import Mark from "./carMark.js";

const Users = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
          console.error("Error hashing password:", err);
        }
      },
    },
    timestamps: true,
  }
);

export default Users;
