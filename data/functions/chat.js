const { Op } = require("sequelize");
const Chat = require("../models/chats.js");
const Message = require("../models/message.js");
const Users = require("../models/user.js");
const sequelize = require("../../config/dbconfig.js");

const getChats = async (user_id) => {
  try {
    const chats = await Chat.findAll({
      where: { user_id },
      include: [
        {
          model: Users,
          as: "ChatUser",
          attributes: ["id", "name", "email", "password", "role", "userrate"],
        },
        {
          model: Message,
          where: {
            receiver_id: { [Op.col]: "Chat.chat_user_id" },
            sender_id: user_id,
            status: "sent",
          },
          required: false,
          attributes: [
            [
              sequelize.fn("COUNT", sequelize.col("messages.id")),
              "unread_messages_count",
            ],
          ],
        },
      ],
      group: ["Chat.chat_id", "ChatUser.id"],
      order: [["create_at", "DESC"]],
    });
    return chats;
  } catch (error) {
    console.error("Chatlarni olishda xatolik:", error.message);
    throw error;
  }
};

const addChat = async (senderId, receiverId) => {
  try {
    const chat = await Chat.create({
      user_id: senderId,
      chat_user_id: receiverId,
    });
    return chat;
  } catch (error) {
    console.error("Chat qo'shishda xatolik:", error.message);
    throw error;
  }
};

const editChatMute = async (user_id, chat_user_id, mute_type) => {
  try {
    const [updated] = await Chat.update(
      { mute_type },
      { where: { user_id, chat_user_id } }
    );
    return updated ? true : false;
  } catch (error) {
    console.error("Chatni ovozdan chiqarishda xatolik:", error.message);
    throw error;
  }
};

module.exports = { addChat, editChatMute, getChats };
