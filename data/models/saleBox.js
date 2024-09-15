const { DataTypes } = require("sequelize");
const sequelize = require("../../config/dbconfig.js");
const Users = require("./user.js");
const Car = require("./automobile.js");

const Cart = sequelize.define(
  "cart",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Car,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    added_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "cart",
  }
);

Cart.belongsTo(Users, { foreignKey: "user_id", as: "users" });
Cart.belongsTo(Car, { foreignKey: "product_id", as: "cars" });

module.exports = Cart;
