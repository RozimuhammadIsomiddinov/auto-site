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
import commerceRoute from "./routes/commerceRoute.js";
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
app.use("/", commerceRoute);
// Socket.io setup
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  // When a user joins
  socket.on("join", (userId) => {
    users[userId] = socket.id;
    console.log(`User ${userId} joined with socket ID ${socket.id}`);
  });

  // Handle sending private messages
  socket.on("send message", async (data) => {
    const { senderId, receiverId, message, type } = data; // Extract type
    console.log("Received message:", data);

    try {
      // Save the message to the database
      const savedMessages = await savedMessage(
        senderId,
        receiverId,
        message,
        "sent",
        type
      ); // Save with type
      console.log("Saved message:", savedMessages);

      // If the receiver is connected, send the message to them
      if (users[receiverId]) {
        io.to(users[receiverId]).emit("receive message", savedMessages); // Emit under 'receive message'
      }

      // Emit the message back to the sender
      socket.emit("receive message", savedMessages); // Emit under 'receive message'
    } catch (error) {
      console.error("Error saving message", error);
      socket.emit("error", "Error sending message");
    }
  });

  // Handle when a message is seen
  socket.on("message seen", async (data) => {
    const { messageId, receiverId } = data;

    try {
      // Update the message status in the database to 'seen'
      const updatedMessages = await updatedMessage("seen", messageId);
      console.log("Updated message status:", updatedMessages);

      // Notify the sender that their message was seen
      const senderSocketId = users[updatedMessages.sender_id];
      if (senderSocketId) {
        io.to(senderSocketId).emit("message seen", updatedMessages);
      }
    } catch (error) {
      console.error("Error updating message status", error);
    }
  });

  // Fetch old messages between two users
  socket.on("fetch messages", async (data) => {
    const { userId, otherUserId } = data;
    console.log("Fetching messages for:", data);

    try {
      // Fetch messages between the two users from the database
      const messages = await message(userId, otherUserId);
      console.log("Fetched messages:", messages);

      // Send the old messages to the client
      socket.emit("old messages", messages);
    } catch (error) {
      console.error("Error fetching messages", error);
      socket.emit("error", "Error fetching messages");
    }
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);

    // Remove the user from the `users` object when they disconnect
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
