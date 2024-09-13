import "dotenv/config";
import http from "http";
import { Server as socketIo } from "socket.io";
import {
  savedMessage,
  updatedMessage,
  message,
} from "./data/functions/messages.js";

const server = http.createServer();
const io = new socketIo(server);

const users = {};

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("join", (userId) => {
    users[userId] = socket.id;
    console.log(`User ${userId} joined with socket ID ${socket.id}`);
  });

  socket.on("private message", async (data) => {
    const { senderId, receiverId, message } = data;
    console.log("Received message:", data);

    try {
      const savedmessage = await savedMessage(
        senderId,
        receiverId,
        message,
        "sent"
      );
      console.log("Saved message:", savedmessage);

      if (users[receiverId]) {
        io.to(users[receiverId]).emit("private message", savedmessage);
        io.to(users[receiverId]).emit("notification", { senderId, message });
      }

      socket.emit("private message", savedmessage);
    } catch (error) {
      console.error("Error saving message", error);
      socket.emit("error", "Error sending message");
    }
  });

  socket.on("message seen", async (data) => {
    const { messageId, receiverId } = data;

    try {
      const updatedmessage = await updatedMessage("seen", messageId);
      console.log("Updated message status:", updatedmessage);

      const senderSocketId = users[updatedmessage.sender_id];
      if (senderSocketId) {
        io.to(senderSocketId).emit("message seen", updatedmessage);
      }
    } catch (error) {
      console.error("Error updating message status", error);
    }
  });

  socket.on("fetch messages", async (data) => {
    const { userId, otherUserId } = data;
    console.log("Fetching messages for:", data);

    try {
      const messages = await message(userId, otherUserId);
      console.log("Fetched messages:", messages);

      socket.emit("old messages", messages);
    } catch (error) {
      console.error("Error fetching messages", error);
      socket.emit("error", "Error fetching messages");
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);

    for (const userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
        break;
      }
    }
  });
});

export default server;
