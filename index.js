import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import carRoutes from "./routes/carRoute.js";
import userRoutes from "./routes/usersRoute.js";
import cartRoutes from "./routes/cartRoute.js";
import { adminRouter } from "./admin.js"; // Import the AdminJS router
import socketServer from "./server.js"; // Import the socket server

dotenv.config();

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

const app = express();
//const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/admin-cars", adminRouter);

app.use("/", carRoutes);
app.use("/", userRoutes);
app.use("/", cartRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
