import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { Server as socketIo } from "socket.io";

import carRoutes from "./routes/carRoute.js";
import userRoutes from "./routes/usersRoute.js";
import cartRoutes from "./routes/cartRoute.js";
import motoRoutes from "./routes/motoRoute.js";
import { adminRouter } from "./admin.js"; // Import the AdminJS router
import {
  savedMessage,
  updatedMessage,
  message,
} from "./data/functions/messages.js";

const app = express();
const server = http.createServer(app);
const io = new socketIo(server);

const users = {};

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Cars API",
      version: "1.0.0",
      description: "Car management API documentation",
    },
    servers: [
      {
        url: "http://localhost:4035",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// AdminJS router
app.use("/admin-cars", adminRouter);

// API routes
app.use("/", carRoutes);
app.use("/", userRoutes);
app.use("/", cartRoutes);
app.use("/", motoRoutes);

// Socket.io setup
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

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
