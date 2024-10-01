const { DataTypes } = require("sequelize");
const sequelize = require("../../config/dbconfig.js");

const bodyOfCar = [
  "hatchback",
  "convertible",
  "crossover",
  "coupe",
  "sedan",
  "pickup",
  "suv",
  "van",
  "mpv",
  "jeep",
  "wagon",
  "cabriolet",
  "roadster",
  "microcar",
  "estate",
  "saloon",
  "city-car",
];
const carModel = [
  "BMW",
  "Baic",
  "Byd",
  "Bently",
  "Chery",
  "Cadillac",
  "Changan",
  "Chevrolet",
  "Citrion",
  "Daewoo",
  "Datsun",
  "Dodge",
  "Exed",
  "ferrari",
];

const Car = sequelize.define(
  "cars",
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
      type: DataTypes.ENUM("petrol", "electric", "hybrid", "diesel"),
      defaultValue: "petrol",
    },
    volume: {
      type: DataTypes.STRING,
    },
    horsepower: {
      type: DataTypes.INTEGER,
    },
    drive: {
      type: DataTypes.ENUM("AWD", "FWD"),
      defaultValue: "AWD",
    },
    checkpoint: {
      type: DataTypes.ENUM("automatic", "manual"),
      defaultValue: "manual",
    },
    doors: {
      type: DataTypes.INTEGER,
      defaultValue: 4,
    },
    body: {
      type: DataTypes.ENUM(...bodyOfCar),
      defaultValue: "sedan",
    },
    statement: {
      type: DataTypes.ENUM("used", "new"),
      defaultValue: "used",
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
      type: DataTypes.ENUM(...carModel),
      allowNull: false,
    },
    model: { type: DataTypes.STRING, allowNull: false },
  },
  {
    timestamps: true,
  }
);

module.exports = Car;
