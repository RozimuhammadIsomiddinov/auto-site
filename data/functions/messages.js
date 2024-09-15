const { Message } = require("../models/message.js");
const Sequelize = require("sequelize");

// Xabarni saqlash
const savedMessage = async (senderId, receiverId, message, status) => {
  try {
    const savedMessage = await Message.create({
      sender_id: senderId,
      receiver_id: receiverId,
      message,
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
        een_at: new Date(),
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
        [Sequelize.Op.or]: [
          { sender_id: userId, receiver_id: otherUserId },
          { sender_id: otherUserId, receiver_id: userId },
        ],
      },
      order: [["timestamp", "ASC"]],
    });
    return messages;
  } catch (error) {
    console.error("Xabarlarni olishda xatolik:", error);
    throw error;
  }
};

module.exports = { savedMessage, updatedMessage, message };
