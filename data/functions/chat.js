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
          attributes: [
            "id",
            "user_name",
            "user_surname",
            "user_gender",
            "user_contact",
          ],
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
              sequelize.fn("COUNT", sequelize.col("Message.id")),
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
    console.error("Chatlarni olishda xatolik:", error);
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
    console.error("Chat qo'shishda xatolik:", error);
    throw error;
  }
};
const editChatMute = async (user_id, chat_user_id, mute_type) => {
  try {
    const [updated] = await Chat.update(
      { mute_type },
      { where: { user_id, chat_user_id }, returning: true }
    );
    return updated;
  } catch (error) {
    console.error("Chatni ovozdan chiqarishda xatolik:", error);
    throw error;
  }
};
module.exports = { addChat, editChatMute, getChats };
