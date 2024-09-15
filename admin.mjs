import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import { Database, Resource } from "@adminjs/sequelize";
import Car from "./data/models/automobile.js";
import Cart from "./data/models/saleBox.js";
import Users from "./data/models/user.js";
import Motorcycle from "./data/models/moto.js";

AdminJS.registerAdapter({ Database, Resource });

const adminJs = new AdminJS({
  resources: [
    {
      resource: Car,
      options: {
        listProperties: [
          "image",
          "country",
          "year",
          "cost",
          "fuel",
          "drive",
          "checkpoint",
          "body",
          "statement",
        ],
      },
    },
    {
      resource: Motorcycle,
      options: {
        listProperties: [
          "image",
          "country",
          "year",
          "cost",
          "fuel",
          "engineVolume",
          "horsepower",
          "drive",
          "body",
          "statement",
        ],
      },
    },
    {
      resource: Users,
      options: {
        listProperties: ["id", "name", "email", "password"],
      },
    },
    {
      resource: Cart,
      options: {
        listProperties: [
          "id",
          "user_id",
          "product_id",
          "quantity",
          "added_time",
        ],
      },
    },
  ],
  rootPath: "/admin-cars",
});

const adminRouter = AdminJSExpress.buildRouter(adminJs);
export { adminJs, adminRouter };
