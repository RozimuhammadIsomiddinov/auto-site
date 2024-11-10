const Message = require("../models/message.js");
const { Op } = require("sequelize");

// Xabarni
const savedMessage = async (senderId, receiverId, message, status, type) => {
  try {
    const savedMessage = await Message.create({
      sender_id: senderId,
      receiver_id: receiverId,
      message,
      type,
      status,
    });
    return savedMessage;
  } catch (error) {
    console.error("Xabarni saqlashda xatolik:", error);
    throw error;
  }
};

// Xabar holatini yangilash
const updatedMessage = async (status, messageId) => {
  try {
    const [affectedRows, [updatedMessage]] = await Message.update(
      {
        status,
        updatedAt: new Date(), // `updatedAt` to'g'ri nomi
      },
      {
        where: { id: messageId },
        returning: true,
      }
    );
    return updatedMessage;
  } catch (error) {
    console.error("Xabar holatini yangilashda xatolik:", error);
    throw error;
  }
};
// Xabarlarni olish
const message = async (userId, otherUserId) => {
  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { sender_id: userId, receiver_id: otherUserId },
          { sender_id: otherUserId, receiver_id: userId },
        ],
      },
      order: [["createdAt", "ASC"]], // `createdAt` timestamp o'rnida
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
