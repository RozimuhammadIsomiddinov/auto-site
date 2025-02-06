import AdminJS from "adminjs";
import { dark, light, noSidebar } from "@adminjs/themes";
import AdminJSExpress from "@adminjs/express";
import { Database, Resource } from "@adminjs/sequelize";
import Car from "./data/models/automobile.js";
import Cart from "./data/models/saleBox.js";
import Users from "./data/models/user.js";
import Motorcycle from "./data/models/moto.js";
import CommerceCar from "./data/models/commerce.js";
import News from "./data/models/news.js";
import Mark from "./data/models/carMark.js";

AdminJS.registerAdapter({ Database, Resource });

const adminJs = new AdminJS({
  defaultTheme: dark.id,
  availableThemes: [dark, light, noSidebar],
  resources: [
    {
      resource: Car,
      options: {
        listProperties: [
          "id",
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
          "body",
          "statement",
          "color",
          "authoremail",
          "rate",
          "mark",
          "model",
        ],
        properties: {
          id: {
            isVisible: { list: true, edit: false, filter: true, show: true },
          },
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
            isVisible: { list: false, edit: true, filter: true, show: true },
          },
          horsepower: {
            isVisible: { list: false, edit: true, filter: true, show: true },
          },
          drive: {
            isVisible: { list: false, edit: true, filter: true, show: true },
          },
          checkpoint: {
            isVisible: { list: false, edit: true, filter: true, show: true },
          },

          body: {
            isVisible: { list: false, edit: true, filter: true, show: true },
          },
          statement: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          description: {
            isVisible: { list: false, edit: true, filter: true, show: false },
          },
          color: {
            isVisible: { list: false, edit: true, filter: true, show: true },
          },
          authoremail: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          rate: {
            isVisible: { list: false, edit: true, filter: true, show: true },
          },
          mark: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          model: {
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
          "statement",
          "authoremail",
          "rate",
          "mark",
          "model",
        ],
        properties: {
          id: {
            isVisible: { list: true, edit: false, filter: true, show: true },
          },
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
            isVisible: { list: false, edit: true, filter: true, show: true },
          },
          horsepower: {
            isVisible: { list: false, edit: true, filter: true, show: true },
          },
          drive: {
            isVisible: { list: false, edit: true, filter: true, show: true },
          },
          transmission: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          body: {
            isVisible: { list: false, edit: true, filter: true, show: true },
          },
          statement: {
            isVisible: { list: false, edit: true, filter: true, show: true },
          },
          description: {
            isVisible: { list: false, edit: true, filter: true, show: false },
          },
          authoremail: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          rate: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          mark: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          model: {
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
      resource: CommerceCar,
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
          "body",
          "statement",
          "authoremail",
          "rate",
          "mark",
          "model",
        ],
        properties: {
          id: {
            isVisible: { list: true, edit: false, filter: true, show: true },
          },
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
            isVisible: { list: false, edit: true, filter: true, show: true },
          },
          volume: {
            isVisible: { list: false, edit: true, filter: true, show: true },
          },
          horsepower: {
            isVisible: { list: false, edit: true, filter: true, show: true },
          },
          drive: {
            isVisible: { list: false, edit: true, filter: true, show: true },
          },
          checkpoint: {
            isVisible: { list: false, edit: true, filter: true, show: true },
          },

          body: {
            isVisible: { list: false, edit: true, filter: true, show: true },
          },
          statement: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          description: {
            isVisible: { list: false, edit: true, filter: true, show: false },
          },

          authoremail: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          rate: {
            isVisible: { list: false, edit: true, filter: true, show: true },
          },
          mark: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          model: {
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
        listProperties: ["id", "image", "name", "email", "role", "userrate"],
        properties: {
          id: {
            isVisible: { list: true, edit: false, filter: true, show: true },
          },
          image: {
            isVisible: { list: true, edit: false, filter: true, show: true },
          },
          name: {
            isVisible: { list: true, edit: false, filter: true, show: true },
          },
          email: {
            isVisible: { list: true, edit: false, filter: true, show: true },
          },
          password: { isVisible: false },
          role: {
            isVisible: { list: true, edit: false, filter: true, show: true },
          },
          userrate: {
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
      resource: News,
      options: {
        listProperties: ["id", "title", "content", "image"],
        properties: {
          id: {
            isVisible: { list: true, edit: false, filter: true, show: true },
          },
          title: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          content: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          image: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
        },
      },
    },
    {
      resource: Mark,
      options: {
        listProperties: ["id", "mark_name", "image"],
        properties: {
          id: {
            isVisible: { list: true, edit: false, filter: true, show: true },
          },
          mark_name: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          image: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
        },
      },
    },
  ],
  rootPath: "/admin-cars",
  branding: {
    companyName: "Auto site",
    softwareBrothers: false,
  },
});

const adminRouter = AdminJSExpress.buildRouter(adminJs);

export { adminJs, adminRouter };
