import AdminJS from "adminjs";
import { dark, light, noSidebar } from "@adminjs/themes";
import AdminJSExpress from "@adminjs/express";
import { Database, Resource } from "@adminjs/sequelize";
import { ComponentLoader } from "adminjs";
import uploadFileFeature from "@adminjs/upload";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import path from "path";
import { generateJWT } from "./data/functions/users.js";

import Car from "./data/models/automobile.js";
import Motorcycle from "./data/models/moto.js";
import CommerceCar from "./data/models/commerce.js";
import Users from "./data/models/user.js";
import Cart from "./data/models/saleBox.js";
import News from "./data/models/news.js";
import Mark from "./data/models/carMark.js";
import Country from "./data/models/country.js";
import Offer from "./data/models/offer.js";
import Banner from "./data/models/banner.js";

dotenv.config();
AdminJS.registerAdapter({ Database, Resource });

const uploadPath = "public/images";
const componentLoader = new ComponentLoader();

const uploadOptions = {
  provider: { local: { bucket: uploadPath } },
  properties: {
    key: "image",
    filePath: "imagePath",
    mimeType: "mimeType",
    file: "uploadedFile",
    url: ({ record }) => {
      const filePath = record?.params?.imagePath || record?.params?.image;
      if (!filePath) return null;
      const cleanedPath = filePath.replace(/^public\//, "");
      return `${process.env.BACKEND_URL}/${cleanedPath}`;
    },
  },
  validation: {
    mimeTypes: ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"],
  },
  uploadPath: (record, filename) => `${filename}`,
  options: {
    publicUrl: (filePath) =>
      `${process.env.BACKEND_URL}/${filePath.replace(/^public\//, "")}`,
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
        navigation: { name: "Автомобили" },
      },
    },
    {
      resource: Motorcycle,
      options: {
        navigation: { name: "Автомобили" },
      },
    },
    {
      resource: CommerceCar,

      options: {
        navigation: { name: "Автомобили", icon: "Truck" },
      },
    },
    {
      resource: Users,
      options: {
        listProperties: ["id", "image", "name", "email", "role"],
        properties: {
          password: { isVisible: false },
        },
        navigation: { name: "Пользователи", icon: "User" },
      },
    },
    {
      resource: Cart,
      options: {
        navigation: { name: "информация", icon: "Database" },
      },
    },
    {
      resource: News,
      options: {
        properties: {
          uploadedFile: {
            isVisible: { list: false, show: false, edit: true },
          },
          image: {
            isVisible: { list: true, show: true, edit: true },
          },
        },
        navigation: { name: "информация", icon: "Database" },
      },
      features: [uploadFileFeature({ ...uploadOptions, componentLoader })],
    },
    {
      resource: Mark,
      options: {
        properties: {
          uploadedFile: {
            isVisible: { list: false, show: false, edit: true },
          },
          image: {
            isVisible: { list: true, show: true, edit: true },
          },
        },
        navigation: { name: "информация", icon: "Database" },
      },
      features: [uploadFileFeature({ ...uploadOptions, componentLoader })],
    },
    {
      resource: Banner,
      options: {
        properties: {
          uploadedFile: {
            isVisible: { list: false, show: false, edit: true },
          },

          image: {
            isVisible: { list: true, show: true, edit: true },
          },
        },
        navigation: { name: "информация", icon: "Database" },
      },
      features: [uploadFileFeature({ ...uploadOptions, componentLoader })],
    },
    {
      resource: Country,
      options: {
        properties: {
          uploadedFile: {
            isVisible: { list: false, show: false, edit: true },
          },
          image: {
            isVisible: { list: true, show: true, edit: true },
          },
        },
        navigation: { name: "Страны", icon: "Globe" },
      },
      features: [uploadFileFeature({ ...uploadOptions, componentLoader })],
    },
    {
      resource: Offer,

      options: {
        navigation: { name: "Предложения", icon: "Gift" },
      },
    },
  ],
  rootPath: "/admin",
  locale: {
    language: "en",
  },

  branding: {
    companyName: "Auto Site",
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
      const user = {
        email: "admin@example.com",
        password: await bcrypt.hash("admin", 10),
      };
      if (
        user.email === email &&
        (await bcrypt.compare(password, user.password))
      ) {
        return { ...user, token: generateJWT(user) };
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

export { adminJs, adminRouter };
