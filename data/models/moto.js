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
const motorcycleBrands = [
  "Harley-Davidson",
  "Ducati",
  "Yamaha",
  "Kawasaki",
  "BMW",
  "Suzuki",
  "Honda",
  "Triumph",
  "KTM",
  "Aprilia",
  "Indian",
  "Royal Enfield",
  "Moto Guzzi",
  "MV Agusta",
  "Bajaj",
  "Benelli",
  "Husqvarna",
  "CFMoto",
  "Norton",
  "Vespa",
];

const Motorcycle = sequelize.define(
  "motorcycles",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    color: {
      type: DataTypes.STRING,
      defaultValue: "white",
    },
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
      defaultValue: "petrol",
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
      defaultValue: "chain",
    },
    transmission: {
      type: DataTypes.ENUM("manual", "automatic"),
      defaultValue: "manual",
    },
    body: {
      type: DataTypes.ENUM(...motorcycleTypes),
      allowNull: false,
    },
    condition: {
      type: DataTypes.ENUM("used", "new"),
      defaultValue: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    authoremail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rate: {
      type: DataTypes.ENUM("cash", "credit"),
      defaultValue: "cash",
    },
    mark: {
      type: DataTypes.ENUM(...motorcycleBrands),
      allowNull: false,
    },
    model: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: true }
);

module.exports = Motorcycle;
