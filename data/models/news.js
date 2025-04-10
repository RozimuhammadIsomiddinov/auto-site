import { DataTypes } from "sequelize";
import sequelize from "../../config/dbconfig.js";

const News = sequelize.define(
  "news",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    vehicle: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    author: {
      type: DataTypes.STRING(100),
      defaultValue: "admin",
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default News;
