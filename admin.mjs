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
import Chat from "./data/models/chats.js";
import Country from "./data/models/country.js";
import Offer from "./data/models/offer.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { generateJWT } from "./data/functions/users.js";
dotenv.config();

AdminJS.registerAdapter({ Database, Resource });
const users = async () => {
  return [
    {
      id: 1,
      email: "admin@example.com",
      password: await bcrypt.hash("admin", 10),
    },
  ];
};

const adminJs = new AdminJS({
  defaultTheme: dark.id,
  availableThemes: [dark, light, noSidebar],
  resources: [
    {
      resource: Car,
      options: {
        navigation: { name: "информация", icon: "Database" },
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
        navigation: { name: "информация", icon: "Database" },
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
        navigation: { name: "информация", icon: "Database" },
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
        navigation: { name: "информация", icon: "Database" },
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
        navigation: { name: "информация", icon: "Database" },
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
        navigation: { name: "информация", icon: "Database" },
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
        navigation: { name: "информация", icon: "Database" },
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
    {
      resource: Country,
      options: {
        navigation: { name: "информация", icon: "Database" },
        listProperties: ["id", "name", "image"],
        properties: {
          id: {
            isVisible: { list: true, edit: false, filter: true, show: true },
          },
          name: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          image: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
        },
      },
    },
    {
      resource: Offer,
      options: {
        navigation: { name: "информация", icon: "Database" },
        listProperties: ["id", "name", "surname", "phone"],
        properties: {
          id: {
            isVisible: { list: true, edit: false, filter: true, show: true },
          },
          name: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          surname: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          phone: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
        },
      },
    },
    {
      resource: Chat,
      options: {
        navigation: { name: "информация", icon: "Database" },
        listProperties: ["chat_id", "chat_user_id", "user_id", "mute_type"],
        properties: {
          chat_id: {
            isVisible: { list: true, edit: false, filter: true, show: true },
          },
          chat_user_id: {
            isVisible: { list: true, edit: false, filter: true, show: true },
          },
          user_id: {
            isVisible: { list: true, edit: false, filter: true, show: true },
          },
          mute_type: {
            isVisible: { list: true, edit: false, filter: true, show: true },
          },
        },
      },
    },
  ],
  rootPath: "/admin",
  dashboard: {
    handler: async () => {
      return { component: null };
    },
  },
  branding: {
    companyName: "Auto site",
    metaTitle: "Admin Dashboard",
    hideSidebar: false,
    softwareBrothers: false,

    withMadeWithLove: false,
  },
});

// Autentifikatsiya qilish
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate: async (email, password) => {
      const user = (await users()).find((u) => u.email === email);
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = generateJWT(user.id);
        return { ...user, token };
      }
      return false;
    },
    cookiePassword: process.env.DB_PASSWORD,
  },
  null,
  {
    resave: false,
    saveUninitialized: true,
    secret: process.env.JWT_SECRET,
    cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }, // 1 kunlik token
  }
);

//const adminRouter = AdminJSExpress.buildRouter(adminJs);

export { adminJs, adminRouter };
