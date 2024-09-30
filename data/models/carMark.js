const { DataTypes } = require("sequelize");
const sequelize = require("../../config/dbconfig.js");

const Mark = sequelize.define(
  "car_mark",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mark_name: {
      type: DataTypes.STRING,
      allowNull: false,
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
