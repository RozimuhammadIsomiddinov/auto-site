import dotenv from "dotenv";
import express from "express";
import http from "http";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { Server as socketIo } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import carRoutes from "./routes/carRoute.js";
import userRoutes from "./routes/usersRoute.js";
import cartRoutes from "./routes/cartRoute.js";
import motoRoutes from "./routes/motoRoute.js";
import { adminRouter } from "./admin.mjs";
import {
  savedMessage,
  updatedMessage,
  message,
} from "./data/functions/messages.js";

dotenv.config();

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
        url: "http://212.67.11.143:4035/",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Fix __dirname issue
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create upload directory if it does not exist
const publicFolderPath = path.join(__dirname, "public");
const imagesFolderPath = path.join(publicFolderPath, "images");

if (!fs.existsSync(publicFolderPath)) {
  fs.mkdirSync(publicFolderPath);
  console.log("Public folder created successfully.");
} else {
  console.log("Public folder already exists.");
}

if (!fs.existsSync(imagesFolderPath)) {
  fs.mkdirSync(imagesFolderPath);
  console.log("Images folder created successfully.");
} else {
  console.log("Images folder already exists within the public folder.");
}

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.resolve("./public")));

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
      const savedMessageResult = await savedMessage(
        senderId,
        receiverId,
        message,
        "sent"
      );
      console.log("Saved message:", savedMessageResult);

      if (users[receiverId]) {
        io.to(users[receiverId]).emit("private message", savedMessageResult);
        io.to(users[receiverId]).emit("notification", { senderId, message });
      }

      socket.emit("private message", savedMessageResult);
    } catch (error) {
      console.error("Error saving message", error);
      socket.emit("error", "Error sending message");
    }
  });

  socket.on("message seen", async (data) => {
    const { messageId, receiverId } = data;

    try {
      const updatedMessageResult = await updatedMessage("seen", messageId);
      console.log("Updated message status:", updatedMessageResult);

      const senderSocketId = users[updatedMessageResult.sender_id];
      if (senderSocketId) {
        io.to(senderSocketId).emit("message seen", updatedMessageResult);
      }
    } catch (error) {
      console.error("Error updating message status", error);
    }
  });

  socket.on("fetch messages", async (data) => {
    const { userId, otherUserId } = data;
    console.log("Fetching messages for:", data);

    try {
      const messagesResult = await message(userId, otherUserId);
      console.log("Fetched messages:", messagesResult);

      socket.emit("old messages", messagesResult);
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
