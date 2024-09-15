require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const { Server: socketIo } = require("socket.io");
const path = require("path");
const carRoutes = require("./routes/carRoute");
const userRoutes = require("./routes/usersRoute");
const cartRoutes = require("./routes/cartRoute");
const motoRoutes = require("./routes/motoRoute");
//const { adminRouter } = require("./admin.js"); // Import the AdminJS router
const {
  savedMessage,
  updatedMessage,
  message,
} = require("./data/functions/messages");

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

app.use(express.json({ origin: "*" }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.resolve(__dirname, "public")));

// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// AdminJS router
//app.use("/admin-cars", adminRouter);

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
