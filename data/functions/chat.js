const { Op } = require("sequelize");
const Chat = require("../models/chats.js");
const Message = require("../models/message.js");
const Users = require("../models/user.js");
const sequelize = require("../../config/dbconfig.js");
const logger = require("../../logs/logs.js");

const getChats = async (user_id) => {
  const chats = await Chat.findAll({
    attributes: [
      "chat_id",
      [sequelize.col("sender.id"), "chat_user_id"],
      [sequelize.col("sender.name"), "chat_user_name"],
      "mute_type",
      "create_at",
      [
        sequelize.fn("COUNT", sequelize.col("messages.id")),
        "unread_messages_count",
      ],
    ],
    include: [
      {
        model: Users,
        as: "sender",
        attributes: [],
      },
      {
        model: Users,
        as: "receiver",
        attributes: [],
      },
      {
        model: Message,
        as: "messages",
        required: false,
        attributes: [],
        where: {
          receiver_id: user_id,
          status: "sent",
        },
        on: {
          chat_id: {
            [Op.eq]: sequelize.col("Chat.chat_id"),
          },
          sender_id: {
            [Op.eq]: sequelize.col("messages.sender_id"),
          },
        },
      },
    ],
    where: { user_id },
    group: [
      "Chat.chat_id",
      "sender.id",
      "sender.name",
      "Chat.mute_type",
      "Chat.create_at",
    ],
  });

  return chats;
};

const addChat = async (senderId, receiverId) => {
  const res = await Chat.findOne({ where: { chat_user_id: senderId } });
  if (res) return { message: "oldin yaratilgan" };
  try {
    const chat = await Chat.create({
      user_id: senderId,
      chat_user_id: receiverId,
    });
    return chat;
  } catch (error) {
    logger.error(`Chat qo'shishda xatolik: ${error.message}`);
    throw error;
  }
};
const editChatMute = async (user_id, chat_user_id, mute_type) => {
  try {
    mute_type = mute_type == "true" ? true : false;

    const [updated] = await Chat.update(
      { mute_type },
      { where: { user_id, chat_user_id } }
    );

    return updated > 0;
  } catch (error) {
    logger.error(`Chatni ovozdan chiqarishda xatolik: ${error.message}`);
    throw error;
  }
};
const getNotifications = async (user_id) => {
  try {
    const notifications = await Message.findAll({
      attributes: [
        "chat_id",
        [sequelize.col("sender.id"), "chat_user_id"],
        [sequelize.col("sender.name"), "chat_user_name"],
        [
          sequelize.fn("COUNT", sequelize.col("Message.id")),
          "unread_messages_count",
        ],
      ],
      include: [
        {
          model: Users,
          as: "sender",
          attributes: [],
        },
      ],
      where: {
        receiver_id: user_id,
        status: "sent", // Faqat o'qilmagan xabarlar
      },
      group: ["Message.chat_id", "sender.id", "sender.name"],
    });
    return notifications[0].dataValues;
  } catch (error) {
    logger.error(`Bildirishnomalarni olishda xatolik: ${error.message}`);
    throw error;
  }
};

module.exports = { addChat, editChatMute, getChats, getNotifications };
