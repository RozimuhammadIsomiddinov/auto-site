const { DataTypes } = require("sequelize");
const sequelize = require("../../config/dbconfig.js");

const Message = sequelize.define(
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

module.exports = Message;
