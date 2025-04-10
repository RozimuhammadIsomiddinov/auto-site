import { DataTypes } from "sequelize";
import sequelize from "../../config/dbconfig.js";
import Mark from "./carMark.js";

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
      type: DataTypes.ENUM("AWD", "FWD", "RWD"),
      allowNull: false,
    },
    checkpoint: {
      type: DataTypes.ENUM("automatic", "manual"),
      defaultValue: "manual",
    },
    body: {
      type: DataTypes.ENUM(
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
        "city-car"
      ),
    },
    statement: {
      type: DataTypes.ENUM("used", "new"),
      defaultValue: "new",
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
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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
    mark_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Mark,
        key: "id",
      },
    },
    video_link: {
      type: DataTypes.STRING,
    },
    archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

CommerceCar.belongsTo(Mark, { foreignKey: "mark_id", as: "mark" });

export default CommerceCar;
