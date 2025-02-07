// Import necessary modules
import dotenv from "dotenv";
import express from "express";
import http from "http";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { Server as SocketIO } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import fileUpload from "./middlewares/multer.js";

import carRoutes from "./routes/carRoute.js";
import userRoutes from "./routes/usersRoute.js";
import cartRoutes from "./routes/cartRoute.js";
import motoRoutes from "./routes/motoRoute.js";
import commerceRoute from "./routes/commerceRoute.js";
import bannerRoute from "./routes/banner.js";
import newsRoute from "./routes/news.js";
import markRoute from "./routes/marks.js";
import video_linkRouter from "./routes/video_link.js";
import filter from "./routes/filters.js";

import { adminRouter } from "./admin.mjs";
import {
  savedMessage,
  updatedMessage,
  message,
} from "./data/functions/messages.js";
import {
  addChat,
  editChatMute,
  getChats,
  getNotifications,
} from "./data/functions/chat.js";
import logger from "./logs/logs.js";

dotenv.config();

// Set up server and socket.io
const app = express();
const server = http.createServer(app);
const io = new SocketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

const users = {}; // Store connected users

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
        url: "https://api.youcarrf.ru",
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
  logger.info("Public folder created successfully.");
} else {
  logger.info("Public folder already exists.");
}

if (!fs.existsSync(imagesFolderPath)) {
  fs.mkdirSync(imagesFolderPath);
  logger.info("Images folder created successfully.");
} else {
  logger.info("Images folder already exists within the public folder.");
}

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

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
app.use("/", commerceRoute);
app.use("/", newsRoute);
app.use("/", markRoute);
app.use("/", filter);
app.use("/", bannerRoute);
app.use("/", video_linkRouter);

// Socket.io setup
io.on("connection", (socket) => {
  logger.info("A user connected", socket.id);
  // join hodisasi uchun kod
  socket.on("join", async (userId) => {
    // userId formatini tekshirish
    if (typeof userId !== "string" && typeof userId !== "number") {
      logger.error(`Noto'g'ri userId formati: ${typeof userId}`, userId);
      return;
    }

    users[userId] = socket.id;
    logger.info(`User ${userId} socket ID ${socket.id} bilan qo'shildi`);

    try {
      const notifications = await getNotifications(userId);
      if (notifications.length > 0) {
        socket.emit("notifications", notifications);
      }
    } catch (error) {
      logger.error(
        `Foydalanuvchi uchun bildirishnomalar olishda xatolik ${userId}: ${error.message}`
      );
    }
  });

  socket.on("send message", async (data) => {
    const { senderId, receiverId, message, type } = data; // Extract type
    logger.info(`Received message: ${data}`);

    try {
      // Save the message to the database
      const savedMessages = await savedMessage(
        senderId,
        receiverId,
        message,
        "sent",
        type
      ); // Save with type
      logger.info(`Saved message: ${savedMessages}`);

      // If the receiver is connected, send the message to them
      if (users[receiverId]) {
        io.to(users[receiverId]).emit("receive message", savedMessages); // Emit under 'receive message'
      }

      // Emit the message back to the sender
      socket.emit("receive message", savedMessages); // Emit under 'receive message'
    } catch (error) {
      logger.error(`Error saving message: ${error}`);
    }
  });

  socket.on("message seen", async (data) => {
    const { messageId, receiverId } = data;

    try {
      // Update the message status in the database to 'seen'
      const updatedMessages = await updatedMessage("seen", messageId);
      logger.info(`Updated message status: ${updatedMessages}`);

      // Notify the sender that their message was seen
      const senderSocketId = users[updatedMessages.sender_id];
      if (senderSocketId)
        io.to(senderSocketId).emit("message seen", updatedMessages);
    } catch (error) {
      logger.error(`Error updating message status: ${error}`);
    }
  });

  // Fetch old messages between two users
  socket.on("fetch messages", async (data) => {
    const { userId, otherUserId } = data;
    logger.info(`Fetching messages for: ${data}`);

    try {
      // Fetch messages between the two users from the database
      const messages = await message(userId, otherUserId);
      logger.info(`Fetched messages: ${messages}`);

      // Send the old messages to the client
      socket.emit("old messages", messages);
    } catch (error) {
      logger.error(`Error fetching messages: ${error}`);
      socket.emit("error", "Error fetching messages");
    }
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    logger.info(`User disconnected: ${socket.id}`);

    // Remove the user from the `users` object when they disconnect
    for (const userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
        break;
      }
    }
  });
});

// Notification example: Emit a notification when a message is received
app.post("/notify", (req, res) => {
  const { userId, notification } = req.body;
  if (users[userId]) {
    io.to(users[userId]).emit("notification", notification);
    res.status(200).json({ message: "Notification sent" });
  } else {
    res.status(404).json({ message: "User not connected" });
  }
});

app.post("/upload", fileUpload.single("file"), (req, res) => {
  const filePath = `${process.env.BACKEND_URL}/${req.file.filename}`;
  io.emit("receiveFile", filePath);
  res.json({ filePath });
});

// Chat routes
app.get("/chat/users/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const chats = await getChats(user_id); // Use the imported function

    if (chats?.length > 0) {
      return res.status(200).json({
        status: "Success",
        data: chats,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Not found",
      });
    }
  } catch (error) {
    logger.error(`chat getdagi error: ${error}`);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
});

app.post("/chat/add", async (req, res) => {
  try {
    const { senderId, receiverId } = req.body; // Ensure to send these in the request body
    const chat = await addChat(senderId, receiverId); // Use the imported function
    return res.status(201).json({
      status: "Success",
      data: chat,
    });
  } catch (error) {
    logger.error(`chat add dagi error: ${error}`);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
});

app.post("/chat/edit/mute", async (req, res) => {
  try {
    const { user_id, chat_user_id, mute_type } = req.body;
    const editChatResult = await editChatMute(user_id, chat_user_id, mute_type);

    if (editChatResult) {
      return res.status(200).json({
        status: "Success",
        data: editChatResult,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "Bad request",
      });
    }
  } catch (error) {
    logger.error(`mute dagi error: ${error}`);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
});
const port = process.env.PORT;
server.listen(port);
