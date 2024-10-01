const { DataTypes } = require("sequelize");
const sequelize = require("../../config/dbconfig.js");
const Users = require("./user.js");

const Message = sequelize.define(
  "Message",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sender_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Users,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    receiver_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Users,
        key: "id",
      },
      onDelete: "CASCADE",
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
    timestamps: true,
  }
);
Message.belongsTo(Users, { as: "Sender", foreignKey: "sender_id" });
Message.belongsTo(Users, { as: "Receiver", foreignKey: "receiver_id" });

module.exports = { Message };
