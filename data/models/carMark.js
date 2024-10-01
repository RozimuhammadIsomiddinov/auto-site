const { DataTypes } = require("sequelize");
const sequelize = require("../../config/dbconfig.js");

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

const Mark = sequelize.define(
  "car_mark",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mark_name: {
      type: DataTypes.ENUM(...carModel),
      allowNull: false,
      defaultValue: carModel[0],
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "car_mark",
    timestamps: true,
    createdAt: "createdat",
    updatedAt: "updatedat",
  }
);

module.exports = Mark;
