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
          "milage",
          "engine",
          "volume",
          "horsepower",
          "drive",
          "checkpoint",
          "doors",
          "body",
          "statement",
          "description",
        ],
        properties: {
          id: { isVisible: true },
          image: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          country: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          year: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          cost: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          milage: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          engine: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          volume: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          horsepower: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          drive: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          checkpoint: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          doors: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          body: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          statement: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          description: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          createdAt: {
            isVisible: { list: false, edit: false, filter: false, show: true },
          },
          updatedAt: {
            isVisible: { list: false, edit: false, filter: false, show: true },
          },
        },
      },
    },
    {
      resource: Users,
      options: {
        listProperties: ["id", "name", "email", "password"],
        properties: {
          id: {
            isVisible: { list: true, edit: false, filter: true, show: true },
          },
          name: {
            isVisible: { list: true, edit: false, filter: true, show: true },
          },
          email: {
            isVisible: { list: true, edit: false, filter: true, show: true },
          },
          createdAt: {
            isVisible: { list: false, edit: false, filter: false, show: true },
          },
        },
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
        properties: {
          id: {
            isVisible: { list: true, edit: false, filter: true, show: true },
          },
          user_id: {
            isVisible: { list: true, edit: false, filter: true, show: true },
          },
          product_id: {
            isVisible: { list: true, edit: false, filter: true, show: true },
          },
          quantity: {
            isVisible: { list: true, edit: false, filter: true, show: true },
          },
          added_time: {
            isVisible: { list: true, edit: false, filter: true, show: true },
          },
        },
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
          "milage",
          "engine",
          "volume",
          "horsepower",
          "drive",
          "transmission",
          "body",
          "condition",
          "description",
        ],
        properties: {
          id: { isVisible: true },
          image: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          country: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          year: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          cost: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          milage: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          engine: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          volume: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          horsepower: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          drive: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          transmission: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          body: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          condition: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          description: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          created_at: {
            isVisible: { list: false, edit: false, filter: false, show: true },
          },
          updated_at: {
            isVisible: { list: false, edit: false, filter: false, show: true },
          },
        },
      },
    },
  ],
  rootPath: "/admin-cars",
});

const adminRouter = AdminJSExpress.buildRouter(adminJs);

export { adminJs, adminRouter };
