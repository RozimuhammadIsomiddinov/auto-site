import { DataTypes } from "sequelize";
import sequelize from "../../config/dbconfig.js";
import Users from "./user.js";
import Car from "./automobile.js";

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
    timestamps: false, // Qo'shimcha timestamps kerak bo'lmasa
    tableName: "cart", // Jadval nomi
  }
);
Cart.belongsTo(Users, { foreignKey: "user_id", as: "users" });
Cart.belongsTo(Car, { foreignKey: "product_id", as: "cars" });
export default Cart;
