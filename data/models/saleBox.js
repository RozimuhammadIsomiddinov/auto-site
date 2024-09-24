const { DataTypes } = require("sequelize");
const sequelize = require("../../config/dbconfig.js");
const Users = require("./user.js");
const Car = require("./automobile.js");
const Motorcycle = require("./moto.js");
const CommerceCar = require("./commerce.js");

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

// Foreign key relationship for CommerceCar
Cart.belongsTo(CommerceCar, {
  foreignKey: "product_id",
  constraints: false,
  as: "commerce_cars",
});

// Foreign key relationship for Car
Cart.belongsTo(Car, {
  foreignKey: "product_id",
  constraints: false,
  as: "cars",
});

// Foreign key relationship for Motorcycle
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

module.exports = Cart;
