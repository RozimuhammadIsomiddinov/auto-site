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
          createdAt: {
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
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          email: {
            isVisible: { list: true, edit: true, filter: true, show: true },
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
          "fuel",
          "engineVolume",
          "horsepower",
          "drive",
          "body",
          "statement",
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
          createdAt: {
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
