import { DataTypes } from "sequelize";
import sequelize from "../../config/dbconfig.js";
import Users from "./user.js";
import Chat from "./chats.js";

const Message = sequelize.define(
  "Message",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    chat_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: Chat,
        key: "chat_id",
      },
      onDelete: "CASCADE",
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    receiver_id: {
      type: DataTypes.INTEGER,
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
    type: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "messages",
    timestamps: true,
  }
);

Chat.hasMany(Message, {
  foreignKey: "sender_id",
  as: "messages",
});

Message.belongsTo(Users, { foreignKey: "sender_id", as: "sender" });
Message.belongsTo(Users, { foreignKey: "receiver_id", as: "receiver" });

export default Message;
