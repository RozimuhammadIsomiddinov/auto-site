const { DataTypes } = require("sequelize");
const sequelize = require("../../config/dbconfig.js");
const Users = require("./user.js");
const Chat = sequelize.define(
  "Chat",
  {
    chat_id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    chat_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    mute_type: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    create_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "chats",
    timestamps: false,
  }
);

Chat.belongsTo(Users, { as: "ChatUser", foreignKey: "chat_user_id" });
Chat.belongsTo(Users, { as: "User", foreignKey: "user_id" });

module.exports = Chat;
