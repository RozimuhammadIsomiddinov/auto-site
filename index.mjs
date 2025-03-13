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
import country from "./routes/country.js";
import archive from "./routes/archive.js";
import offer from "./routes/offer.js";
import { adminRouter } from "./admin.mjs";
import bodyParser from "body-parser";

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
        url: "https://api.youcarrf.ru",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicFolderPath = path.join(__dirname, "public");
const imagesFolderPath = path.join(publicFolderPath, "images");

if (!fs.existsSync(publicFolderPath)) {
  fs.mkdirSync(publicFolderPath);
  logger.info("Public folder created successfully.");
}
if (!fs.existsSync(imagesFolderPath)) {
  fs.mkdirSync(imagesFolderPath);
  logger.info("Images folder created successfully.");
}
// AdminJS router
app.use("/admin", adminRouter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/public", express.static(path.resolve("./public")));

// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
app.use("/", country);
app.use("/", archive);
app.use("/", offer);
// Socket.io setup
io.on("connection", (socket) => {
  socket.on("join", async (userId) => {
    if (typeof userId !== "string" && typeof userId !== "number") {
      logger.error(`Noto'g'ri userId formati: ${typeof userId}`, userId);
      return;
    }
    users[userId] = socket.id;

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
    const { senderId, receiverId, message, type, chat_id } = data;

    try {
      const savedMsg = await savedMessage(
        chat_id,
        senderId,
        receiverId,
        message,
        "sent",
        type
      );

      if (users[receiverId]) {
        const notifications = await getNotifications(receiverId);
        io.to(users[receiverId]).emit("notifications", notifications);
      }

      socket.emit("receive message", savedMsg);
      if (users[receiverId]) {
        io.to(users[receiverId]).emit("receive message", savedMsg);
      }
    } catch (error) {
      logger.error(`Xabarni saqlashda xatolik: ${error}`);
    }
  });
  socket.on("message seen", async (data) => {
    const { messageId, receiverId } = data;

    try {
      const updatedMsg = await updatedMessage("seen", messageId);
      if (!updatedMsg) return "Xabar topilmadi yoki yangilanmadi.";
      if (users[updatedMsg.sender_id]) {
        io.to(users[updatedMsg.sender_id]).emit("message seen", updatedMsg);

        const notifications = await getNotifications(receiverId);
        io.to(users[receiverId]).emit("notifications", notifications);
      }
    } catch (error) {
      logger.error(`Xabar holatini yangilashda xatolik: ${error}`);
    }
  });

  socket.on("fetch messages", async (data) => {
    const { userId, otherUserId } = data;

    try {
      const messages = await message(userId, otherUserId);
      socket.emit("old messages", messages);
    } catch (error) {
      logger.error(`Error fetching messages: ${error}`);
      socket.emit("error", "Error fetching messages");
    }
  });

  socket.on("disconnect", () => {
    for (const userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
        break;
      }
    }
  });
});

app.post("/notify", async (req, res) => {
  const { userId } = req.body;
  try {
    const notifications = await getNotifications(userId);

    if (users[userId]) {
      io.to(users[userId]).emit("notifications", notifications);
    }

    res.status(200).json({ message: "Notifications sent", notifications });
  } catch (error) {
    console.error(`Notification error: ${error.message}`);
    res.status(500).json({ message: "Failed to send notifications" });
  }
});

app.post("/upload", fileUpload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Fayl yuklanmadi" });
  }

  const filePath = `${process.env.BACKEND_URL}/${req.file.filename}`;
  io.emit("receiveFile", filePath);
  res.json({ filePath });
});

// Chat routes
app.get("/chat/users/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const chats = await getChats(user_id);

    return res.status(200).json({
      status: "Success",
      data: chats,
    });
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
    const { senderId, receiverId } = req.body;
    const chat = await addChat(senderId, receiverId);

    return res.status(chat.code == 400 ? 200 : 201).json(
      chat.code != 400
        ? {
            status: "Success",
            data: chat.data,
          }
        : {
            status: "Exists",
            message: "Chat oldin yaratilgan",
            data: chat.data,
          }
    );
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
