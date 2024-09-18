const { DataTypes } = require("sequelize");
const sequelize = require("../../config/dbconfig.js");

const motorcycleTypes = [
  "cruiser",
  "sport",
  "touring",
  "standard",
  "dual-sport",
  "dirt-bike",
  "naked-bike",
  "scooter",
  "adventure",
  "bobber",
  "cafe-racer",
  "chopper",
];

const Motorcycle = sequelize.define(
  "motorcycles",
  {
    image: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    milage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    engine: {
      type: DataTypes.ENUM("petrol", "electric", "hybrid"),
      allowNull: false,
    },
    volume: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    horsepower: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    drive: {
      type: DataTypes.ENUM("chain", "belt", "shaft"),
      allowNull: false,
    },
    transmission: {
      type: DataTypes.ENUM("manual", "automatic"),
      allowNull: false,
    },
    body: {
      type: DataTypes.ENUM(...motorcycleTypes),
    },
    condition: {
      type: DataTypes.ENUM("used", "new"),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true, underscored: false }
);

module.exports = Motorcycle;
