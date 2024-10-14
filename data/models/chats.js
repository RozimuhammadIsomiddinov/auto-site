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
      // Existing field for sender
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    user_id: {
      // Existing field for receiver
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

// Update associations to use existing column names
Users.hasMany(Chat, { as: "sentChats", foreignKey: "chat_user_id" });
Users.hasMany(Chat, { as: "receivedChats", foreignKey: "user_id" });

Chat.belongsTo(Users, { as: "sender", foreignKey: "chat_user_id" });
Chat.belongsTo(Users, { as: "receiver", foreignKey: "user_id" });

module.exports = Chat;
