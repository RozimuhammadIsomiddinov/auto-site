import { DataTypes } from "sequelize";
import sequelize from "../../config/dbconfig.js";
import Users from "./user.js";
import Car from "./automobile.js";
import Motorcycle from "./moto.js";
import CommerceCar from "./commerce.js";

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
    },
    product_type: {
      type: DataTypes.ENUM("car", "motorcycle", "commerce"),
      allowNull: false,
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

// Foreign key relationships
Cart.belongsTo(CommerceCar, {
  foreignKey: "product_id",
  constraints: false,
  as: "commerce_cars",
});

Cart.belongsTo(Car, {
  foreignKey: "product_id",
  constraints: false,
  as: "cars",
});

Cart.belongsTo(Motorcycle, {
  foreignKey: "product_id",
  constraints: false,
  as: "motorcycles",
});

// Hook to handle car/motorcycle/commerceCar association
Cart.addHook("afterFind", (result) => {
  if (!result) return;

  if (!Array.isArray(result)) result = [result];

  for (const instance of result) {
    if (instance.product_type === "car" && instance.car) {
      instance.product = instance.car;
    } else if (instance.product_type === "motorcycle" && instance.motorcycle) {
      instance.product = instance.motorcycle;
    } else if (instance.product_type === "commerce" && instance.commerceCars) {
      instance.product = instance.commerceCars;
    }

    delete instance.car;
    delete instance.motorcycle;
    delete instance.commerceCars;
  }
});

export default Cart;
