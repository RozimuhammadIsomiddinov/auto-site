// server.js or index.js
import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import cors from "cors";

import carRoutes from "./routes/carRoute.js";
import userRoutes from "./routes/usersRoute.js";
import cartRoutes from "./routes/cartRoute.js";
import { adminRouter } from "./admin.js"; // Import the AdminJS router

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/admin-cars", adminRouter);

app.use("/", carRoutes);
app.use("/", userRoutes);
app.use("/", cartRoutes);

const port = process.env.PORT || 4035;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
