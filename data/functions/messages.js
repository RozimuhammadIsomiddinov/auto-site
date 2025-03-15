import Message from "../models/message.js";
import { Op } from "sequelize";

export const savedMessage = async (
  chatId,
  senderId,
  receiverId,
  message,
  status,
  type
) => {
  try {
    return await Message.create({
      sender_id: senderId,
      receiver_id: receiverId,
      message,
      status,
      chat_id: chatId,
      type,
    });
  } catch (error) {
    console.error("Xabarni saqlashda xatolik:", error);
    throw error;
  }
};

export const updatedMessage = async (status, id) => {
  try {
    const [affectedRows, updatedMessages] = await Message.update(
      { status, updatedAt: new Date() },
      { where: { id }, returning: true }
    );

    return affectedRows === 0 ? null : updatedMessages[0];
  } catch (error) {
    console.error("Xabar holatini yangilashda xatolik:", error);
    throw error;
  }
};

export const message = async (userId, receiver_id) => {
  try {
    return await Message.findAll({
      where: {
        [Op.or]: [
          { sender_id: userId, receiver_id },
          { sender_id: receiver_id, receiver_id: userId },
        ],
      },
      order: [["createdAt", "ASC"]],
    });
  } catch (error) {
    console.error("Xabarlarni olishda xatolik:", error);
    throw error;
  }
};
