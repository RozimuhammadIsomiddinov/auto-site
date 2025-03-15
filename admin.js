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
import Chat from "./data/models/chats.js";
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
    mimeTypes: [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/svg+xml",
      "application/pdf",
    ],
  },
  uploadPath: (record, filename) => `${filename}`,
  options: {
    bucket: uploadPath,
    publicUrl: (filePath) =>
      `${process.env.BACKEND_URL}/${path.basename(filePath)}`,
  },
};

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
        properties: commonProperties,
        navigation: { name: "информация", icon: "Database" },
      },
    },
    {
      resource: Motorcycle,
      options: {
        properties: commonProperties,
        navigation: { name: "информация", icon: "Database" },
      },
    },
    {
      resource: CommerceCar,
      options: {
        properties: commonProperties,
        navigation: { name: "информация", icon: "Database" },
      },
    },
    {
      resource: Users,
      options: {
        listProperties: ["id", "image", "name", "email", "role", "userrate"],
        properties: { ...commonProperties, password: { isVisible: false } },
        navigation: { name: "информация", icon: "Database" },
      },
    },
    {
      resource: Cart,
      options: { navigation: { name: "информация", icon: "Database" } },
    },
    {
      resource: News,
      options: {
        properties: {
          uploadedFile: {
            isVisible: { list: false, show: false, edit: true },
          },
          image: {
            isVisible: { list: true, show: true, edit: false },
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
            isVisible: { list: true, show: true, edit: false },
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
            isVisible: { list: true, show: true, edit: false },
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
            isVisible: { list: true, show: true, edit: false },
          },
        },
        navigation: { name: "информация", icon: "Database" },
      },
      features: [uploadFileFeature({ ...uploadOptions, componentLoader })],
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
  locale: {
    translations: {
      en: {
        resources: {
          Image: {
            properties: {
              file: "File",
            },
          },
        },
      },
    },
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
