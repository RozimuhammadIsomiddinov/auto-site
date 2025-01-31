const { DataTypes } = require("sequelize");
const sequelize = require("../../config/dbconfig.js");
const Mark = require("./carMark.js");

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
      type: DataTypes.ENUM("AWD", "FWD", "RWD"),
      defaultValue: "AWD",
    },
    checkpoint: {
      type: DataTypes.ENUM("automatic", "manual"),
      defaultValue: "manual",
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
    seen: {
      type: DataTypes.INTEGER,
    },
    liked: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    liked_user: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    mark_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Mark,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Car.belongsTo(Mark, { foreignKey: "mark_id", as: "mark" });

module.exports = Car;
