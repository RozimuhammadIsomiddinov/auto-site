import { Op } from "sequelize";
import Chat from "../models/chats.js";
import Message from "../models/message.js";
import Users from "../models/user.js";
import sequelize from "../../config/dbconfig.js";
import logger from "../../logs/logs.js";
export const getChats = async (user_id) => {
  const chats = await Chat.findAll({
    attributes: [
      "chat_id",
      [
        sequelize.literal(`
        CASE
          WHEN "Chat"."chat_user_id" = ${user_id} THEN "Chat"."user_id"
          ELSE "Chat"."chat_user_id"
        END
      `),
        "chat_user_id",
      ],
      [
        sequelize.literal(`
        CASE
          WHEN "Chat"."chat_user_id" = ${user_id} THEN receiver.name
          ELSE sender.name
        END
      `),
        "chat_user_name",
      ],
      "mute_type",
      "create_at",
      [
        sequelize.literal(`
          (SELECT COUNT(*) FROM messages
          WHERE messages.chat_id = "Chat"."chat_id"
          AND messages.receiver_id = ${user_id}
          AND messages.status = 'sent')
        `),
        "unread_messages_count",
      ],
      [
        sequelize.literal(`
          (SELECT message FROM messages
          WHERE messages.chat_id = "Chat"."chat_id"
          ORDER BY messages."createdAt" DESC
          LIMIT 1)
        `),
        "last_message",
      ],
      [
        sequelize.literal(`
          (SELECT "createdAt" FROM messages
          WHERE messages.chat_id = "Chat"."chat_id"
          ORDER BY messages."createdAt" DESC
          LIMIT 1)
        `),
        "last_message_time",
      ],
      [
        sequelize.literal(`
          (SELECT status FROM messages
          WHERE messages.chat_id = "Chat"."chat_id"
          ORDER BY messages."createdAt" DESC
          LIMIT 1)
        `),
        "last_message_status",
      ],
    ],
    include: [
      { model: Users, as: "sender", attributes: [] },
      { model: Users, as: "receiver", attributes: [] },
    ],
    where: {
      [Op.or]: [{ chat_user_id: user_id }, { user_id: user_id }],
    },
    group: ["Chat.chat_id", "sender.id", "receiver.id"],
  });

  return chats;
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
    const [updated, updatedRows] = await Chat.update(
      { mute_type },
      { where: { user_id, chat_user_id }, returning: true }
    );
    return updated > 0 ? updatedRows : null;
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
