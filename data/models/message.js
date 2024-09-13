import { DataTypes } from "sequelize";
import sequelize from "../../config/dbconfig.js";

export const Message = sequelize.define(
  "Message",
  {
    sender_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiver_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING(1000),
    },
    status: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "messages",
    timestamps: false,
  }
);
