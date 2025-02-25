const { DataTypes } = require("sequelize");
const sequelize = require("../../config/dbconfig");

const Offer = sequelize.define(
  "Offer",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: { type: DataTypes.STRING, allowNull: false },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "offer",
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = Offer;
