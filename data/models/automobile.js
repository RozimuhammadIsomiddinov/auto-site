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

const Car = sequelize.define(
  "cars",
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
      type: DataTypes.ENUM("petrol", "electric", "hybrid", "diesel"),
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
      type: DataTypes.ENUM("both", "all"),
      allowNull: false,
    },
    checkpoint: {
      type: DataTypes.ENUM("automatic", "manual"),
      allowNull: false,
    },
    doors: {
      type: DataTypes.INTEGER,
    },
    body: {
      type: DataTypes.ENUM(...bodyOfCar),
    },
    statement: {
      type: DataTypes.ENUM("used", "new"),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Car;
