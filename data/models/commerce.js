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
const carMark = [
  "BMW",
  "Baic",
  "Byd",
  "Bently",
  "Chery",
  "Cadillac",
  "Changan",
  "Chevrolet",
  "Citroen",
  "Daewoo",
  "Datsun",
  "Dodge",
  "Exeed",
  "Ferrari",
  "Ford",
  "Fiat",
  "GMC",
  "Geely",
  "Genesis",
  "Honda",
  "Hummer",
  "Hyundai",
  "Infiniti",
  "Isuzu",
  "Jaguar",
  "Jeep",
  "Kia",
  "Lamborghini",
  "Lancia",
  "Land Rover",
  "Lexus",
  "Lincoln",
  "Maserati",
  "Mazda",
  "McLaren",
  "Mercedes-Benz",
  "Mini",
  "Mitsubishi",
  "Nissan",
  "Opel",
  "Peugeot",
  "Porsche",
  "Renault",
  "Rolls-Royce",
  "Saab",
  "Seat",
  "Skoda",
  "Subaru",
  "Suzuki",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
];

const CommerceCar = sequelize.define(
  "commerce_cars",
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
      allowNull: false,
    },
    horsepower: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    drive: {
      type: DataTypes.ENUM("AWD", "FWD"),
      allowNull: false,
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
    },
    statement: {
      type: DataTypes.ENUM("used", "new"),
      defaultValue: "new",
    },
    description: {
      type: DataTypes.STRING,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: { type: DataTypes.ENUM(...carMark), allowNull: false },
    seen: {
      type: DataTypes.INTEGER,
    },
    liked: {
      type: DataTypes.INTEGER,
    },
    liked_user: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = CommerceCar;
