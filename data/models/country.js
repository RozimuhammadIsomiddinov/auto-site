import { DataTypes } from "sequelize";
import sequelize from "../../config/dbconfig.js";

const Country = sequelize.define(
  "country",
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
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "country",
    timestamps: false,
  }
);

export default Country;
