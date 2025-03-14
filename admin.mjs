import { dark, light, noSidebar } from "@adminjs/themes";
import AdminJSExpress from "@adminjs/express";
import { Database, Resource } from "@adminjs/sequelize";
import AdminJS from "adminjs";
import path from "path";
import { fileURLToPath } from "url";
import { ComponentLoader } from "adminjs";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { generateJWT } from "./data/functions/users.js";

import Car from "./data/models/automobile.js";
import Motorcycle from "./data/models/moto.js";
import CommerceCar from "./data/models/commerce.js";
import Users from "./data/models/user.js";
import Cart from "./data/models/saleBox.js";
import News from "./data/models/news.js";
import Mark from "./data/models/carMark.js";
import Chat from "./data/models/chats.js";
import Country from "./data/models/country.js";
import Offer from "./data/models/offer.js";

// Fayl yo‘li
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// AdminJS komponent yuklovchi
const componentLoader = new ComponentLoader();
const UploadImageComponent = componentLoader.add(
  "UploadImageComponent",
  path.join(__dirname, "./UploadImageComponent.jsx")
);

dotenv.config();
AdminJS.registerAdapter({ Database, Resource });

const users = async () => [
  {
    id: 1,
    email: "admin@example.com",
    password: await bcrypt.hash("admin", 10),
  },
];

const commonProperties = {
  id: { isVisible: { list: true, edit: false, filter: true, show: true } },
  image: { isVisible: { list: true, edit: true, filter: true, show: true } },
  country: { isVisible: { list: true, edit: true, filter: true, show: true } },
  year: { isVisible: { list: true, edit: true, filter: true, show: true } },
  cost: { isVisible: { list: true, edit: true, filter: true, show: true } },
  milage: { isVisible: { list: true, edit: true, filter: true, show: true } },
  engine: { isVisible: { list: true, edit: true, filter: true, show: true } },
  volume: { isVisible: { list: false, edit: true, filter: true, show: true } },
  horsepower: {
    isVisible: { list: false, edit: true, filter: true, show: true },
  },
  drive: { isVisible: { list: false, edit: true, filter: true, show: true } },
  statement: {
    isVisible: { list: true, edit: true, filter: true, show: true },
  },
  authoremail: {
    isVisible: { list: true, edit: true, filter: true, show: true },
  },
  rate: { isVisible: { list: false, edit: true, filter: true, show: true } },
  mark: { isVisible: { list: true, edit: true, filter: true, show: true } },
  model: { isVisible: { list: true, edit: true, filter: true, show: true } },
  createdAt: {
    isVisible: { list: false, edit: false, filter: false, show: true },
  },
  updatedAt: {
    isVisible: { list: false, edit: false, filter: false, show: true },
  },
};

const adminJs = new AdminJS({
  componentLoader,
  defaultTheme: dark.id,
  availableThemes: [dark, light, noSidebar],
  resources: [
    {
      resource: Car,
      options: {
        navigation: { name: "информация", icon: "Database" },
        properties: commonProperties,
      },
    },
    {
      resource: Motorcycle,
      options: {
        navigation: { name: "информация", icon: "Database" },
        properties: commonProperties,
      },
    },
    {
      resource: CommerceCar,
      options: {
        navigation: { name: "информация", icon: "Database" },
        properties: commonProperties,
      },
    },
    {
      resource: Users,
      options: {
        navigation: { name: "информация", icon: "Database" },
        listProperties: ["id", "image", "name", "email", "role", "userrate"],
        properties: { ...commonProperties, password: { isVisible: false } },
      },
    },
    {
      resource: Cart,
      options: { navigation: { name: "информация", icon: "Database" } },
    },
    {
      resource: News,
      options: { navigation: { name: "информация", icon: "Database" } },
    },
    {
      resource: Mark,
      options: { navigation: { name: "информация", icon: "Database" } },
    },
    {
      resource: Country,
      options: {
        navigation: { name: "информация", icon: "Database" },
        properties: {
          ...commonProperties,
          image: { edit: UploadImageComponent, show: UploadImageComponent },
        },
      },
    },
    {
      resource: Offer,
      options: { navigation: { name: "информация", icon: "Database" } },
    },
    {
      resource: Chat,
      options: { navigation: { name: "информация", icon: "Database" } },
    },
  ],
  rootPath: "/admin",
  branding: {
    companyName: "Auto site",
    metaTitle: "Admin Dashboard",
    hideSidebar: false,
    softwareBrothers: false,
    withMadeWithLove: false,
  },
});

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate: async (email, password) => {
      const user = (await users()).find((u) => u.email === email);
      if (user && (await bcrypt.compare(password, user.password))) {
        return { ...user, token: generateJWT(user.id) };
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
    cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 },
  }
);

//const adminRouter = AdminJSExpress.buildRouter(adminJs);

export { adminJs, adminRouter };
