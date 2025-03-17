import { Op, Sequelize } from "sequelize";
import Chat from "../models/chats.js";
import Message from "../models/message.js";
import Users from "../models/user.js";
import sequelize from "../../config/dbconfig.js";
import logger from "../../logs/logs.js";
Chat.hasMany(Message, { foreignKey: "chat_id", as: "messages" });
Chat.hasOne(Message, { foreignKey: "chat_id", as: "lastMessage" }); // Yangi alias qo‘shildi


export const getChats = async (user_id) => {
  try {
    const chats = await Chat.findAll({
      attributes: [
        "chat_id",
        [sequelize.col("sender.id"), "chat_user_id"],
        [sequelize.col("sender.name"), "chat_user_name"],
        "mute_type",
        "create_at",
        [
          sequelize.literal(`(
            SELECT COUNT(*)
            FROM messages AS m
            WHERE m.chat_id = chats.chat_id
            AND m.receiver_id = `${user_id}`
            AND m.status = 'sent'
          )`),
          "unread_messages_count",
        ],
        [sequelize.col("lastMessage.message"), "last_message"],
        [sequelize.col("lastMessage.createdAt"), "last_message_time"],
      ],
      include: [
        { model: Users, as: "sender", attributes: [] },
        { model: Users, as: "receiver", attributes: [] },
        {
          model: Message,
          as: "lastMessage",
          attributes: ["message", "createdAt"],
          required: false,
          separate: true,
          order: [["createdAt", "DESC"]],
          limit: 1,
        },
      ],
      where: {
        [Op.or]: [{ chat_user_id: user_id }, { user_id: user_id }],
      },
    });

    return { status: "Success", data: chats };
  } catch (error) {
    return {
      status: "Error",
      data: {
        status: 500,
        message: "Internal Server Error",
        error: error.message,
      },
    };
  }
};

export const addChat = async (senderId, receiverId) => {
  try {
    const existingChat = await Chat.findOne({
      where: {
        [Op.or]: [
          { user_id: senderId, chat_user_id: receiverId },
          { user_id: receiverId, chat_user_id: senderId },
        ],
      },
    });

    if (existingChat) {
      return {
        code: 400,
        message: "Chat allaqachon mavjud",
        data: existingChat.dataValues,
      };
    }

    const chat = await Chat.create({
      user_id: senderId,
      chat_user_id: receiverId,
    });
    return { code: 201, message: "Chat muvaffaqiyatli yaratildi", data: chat };
  } catch (error) {
    console.error(`Chat qo'shishda xatolik: ${error.message}`);
    throw error;
  }
};

export const editChatMute = async (user_id, chat_user_id, mute_type) => {
  try {
    mute_type = mute_type === "true";
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

export const getNotifications = async (user_id) => {
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
        [
          sequelize.fn("ARRAY_AGG", sequelize.col("Message.message")),
          "unread_messages_texts",
        ],
        [sequelize.fn("MAX", sequelize.col("Message.updatedAt")), "updatedAt"],
      ],
      include: [{ model: Users, as: "sender", attributes: [] }],
      where: { receiver_id: user_id, status: "sent" },
      group: ["Message.chat_id", "sender.id", "sender.name"],
      order: [
        [sequelize.fn("MAX", sequelize.col("Message.updatedAt")), "DESC"],
      ],
    });
    return notifications.map((n) => n.dataValues);
  } catch (error) {
    logger.error(`Bildirishnomalarni olishda xatolik: ${error.message}`);
    throw error;
  }
};
