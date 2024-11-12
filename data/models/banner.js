const { DataTypes } = require("sequelize");
const sequelize = require("../../config/dbconfig.js");

const Banner = sequelize.define(
  "Banner",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
    image: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    subtitle: {
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
  },
  {
    tableName: "banner",
    timestamps: true,
  }
);

module.exports = Banner;
