import { DataTypes } from "sequelize";
import sequelize from "../../config/dbconfig.js";

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
    timestamps: false,
  }
);

export default Banner;
