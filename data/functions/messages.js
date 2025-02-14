const Message = require("../models/message.js");
const { Op } = require("sequelize");

const savedMessage = async (
  chatId,
  senderId,
  receiverId,
  message,
  status,
  type
) => {
  try {
    const savedMessage = await Message.create({
      sender_id: senderId,
      receiver_id: receiverId,
      message,
      status,
      chat_id: chatId,
      type,
    });
    return savedMessage;
  } catch (error) {
    console.error("Xabarni saqlashda xatolik:", error);
    throw error;
  }
};
const updatedMessage = async (status, id) => {
  try {
    const [affectedRows, updatedMessages] = await Message.update(
      {
        status,
        updatedAt: new Date(),
      },
      {
        where: { id },
        returning: true,
      }
    );

    if (affectedRows === 0) {
      return null;
    }

    return updatedMessages[0];
  } catch (error) {
    console.error("Xabar holatini yangilashda xatolik:", error);
    throw error;
  }
};

const message = async (userId, otherUserId) => {
  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { sender_id: userId, receiver_id: otherUserId },
          { sender_id: otherUserId, receiver_id: userId },
        ],
      },
      order: [["createdAt", "ASC"]],
    });
    return messages;
  } catch (error) {
    console.error("Xabarlarni olishda xatolik:", error);
    throw error;
  }
};
module.exports = {
  message,
  updatedMessage,
  savedMessage,
};
