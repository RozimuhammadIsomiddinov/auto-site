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
const componentOptions = {
  year: {
    label: "Год выпуска",
    isVisible: { list: true, show: true, edit: false },
  },
  cost: {
    label: "Цена",
    isVisible: { list: true, show: true, edit: false },
  },
  milage: {
    label: "Пробег",
    isVisible: { list: true, show: true, edit: false },
  },
  engine: {
    label: "Двигатель",
    isVisible: { list: true, show: true, edit: false },
  },
  volume: {
    label: "Объем",
    isVisible: { list: true, show: true, edit: false },
  },
  horsepower: {
    label: "Лошадиные силы",
    isVisible: { list: true, show: true, edit: false },
  },
  drive: {
    label: "Привод",
    isVisible: { list: true, show: true, edit: false },
  },
  checkpoint: {
    label: "Коробка передач",
    isVisible: { list: true, show: true, edit: false },
  },
  statement: {
    label: "Состояние",
    isVisible: { list: true, show: true, edit: false },
  },
  description: {
    label: "Описание",
    isVisible: { list: true, show: true, edit: false },
  },
  authoremail: {
    label: "Email автора",
    isVisible: { list: true, show: true, edit: false },
  },
  rate: {
    label: "Оплата",
    isVisible: { list: true, show: true, edit: false },
  },
  seen: {
    label: "Просмотры",
    isVisible: { list: true, show: true, edit: false },
  },
  liked: {
    label: "Лайки",
    isVisible: { list: true, show: true, edit: false },
  },
  liked_user: {
    label: "Понравилось пользователям",
    isVisible: { list: true, show: true, edit: false },
  },
  mark: {
    label: "Марка",
    isVisible: { list: true, show: true, edit: false },
  },
  model: {
    label: "Модель",
    isVisible: { list: true, show: true, edit: false },
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
        properties: { ...componentOptions },
        navigation: { name: "Автомобили" },
      },
    },
    {
      resource: Motorcycle,
      options: {
        properties: { ...componentOptions },

        navigation: { name: "Автомобили" },
      },
    },
    {
      resource: CommerceCar,

      options: {
        properties: { ...componentOptions },

        navigation: { name: "Автомобили", icon: "Truck" },
      },
    },
    {
      resource: Users,
      options: {
        listProperties: ["id", "image", "name", "email", "role"],
        properties: {
          name: { label: "Имя пользователя" },
          email: { label: "Электронная почта" },
          password: { label: "Пароль" },
          role: { label: "Роль" },
          userrate: { label: "Тариф" },
          password: { isVisible: false },
        },
        navigation: { name: "Пользователи", icon: "User" },
      },
    },
    {
      resource: Cart,
      options: {
        properties: {
          user_id: { label: "Пользователь" },
          product_id: { label: "Идентификатор товара" },
          product_type: { label: "Тип товара" },
          quantity: { label: "Количество" },
          added_time: { label: "Дата добавления" },
        },
        navigation: { name: "информация", icon: "Database" },
      },
    },
    {
      resource: News,
      options: {
        properties: {
          title: { label: "Заголовок" },
          content: { label: "Содержание" },
          vehicle: { label: "Транспорт" },
          author: { label: "Автор" },
          uploadedFile: {
            isVisible: { list: false, show: false, edit: true },
          },
          image: {
            label: "Изображение",
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
          mark_name: { label: "Название марки" },

          uploadedFile: {
            isVisible: { list: false, show: false, edit: true },
          },
          image: {
            label: "Изображение",
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
          title: { label: "Заголовок" },
          subtitle: { label: "Подзаголовок" },
          image: {
            label: "Изображение",
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
          name: {
            label: "Название",
          },
          uploadedFile: {
            isVisible: { list: false, show: false, edit: true },
          },
          image: {
            label: "Изображение",
            isVisible: { list: true, show: true, edit: false },
          },
          description: {
            label: "Описание",
          },
        },
        navigation: { name: "Страны", icon: "Globe" },
      },
      features: [uploadFileFeature({ ...uploadOptions, componentLoader })],
    },
    {
      resource: Offer,

      options: {
        properties: {
          name: { label: "Имя" },
          surname: { label: "Фамилия" },
          phone: { label: "Телефон" },
        },
        navigation: { name: "Предложения", icon: "Gift" },
      },
    },
  ],
  rootPath: "/admin",
  locale: {
    language: "ru",
    translations: {
      labels: { navigation: "Навигация", dashboard: "Панель управления" },
      messages: { welcome: "Добро пожаловать!", noRecords: "Нет записей" },
      resources: {
        Car: {
          name: "Автомобили",
          properties: {
            mark: "Марка",
            model: "Модель",
            year: "Год выпуска",
            cost: "Цена",
            milage: "Пробег",
            engine: "Двигатель",
            volume: "Объем",
            horsepower: "Лошадиные силы",
            drive: "Привод",
            checkpoint: "Коробка передач",
            statement: "Состояние",
            description: "Описание",
            authoremail: "Email автора",
            rate: "Оплата",
            seen: "Просмотры",
            liked: "Лайки",
            liked_user: "Понравилось пользователям",
          },
        },
        Motorcycle: {
          name: "Мотоциклы",
          properties: {
            mark: "Марка",
            model: "Модель",
            year: "Год выпуска",
            cost: "Цена",
            milage: "Пробег",
            engine: "Двигатель",
            volume: "Объем",
            horsepower: "Лошадиные силы",
            drive: "Привод",
            checkpoint: "Коробка передач",
            statement: "Состояние",
            description: "Описание",
            authoremail: "Email автора",
            rate: "Оплата",
            seen: "Просмотры",
            liked: "Лайки",
            liked_user: "Понравилось пользователям",
          },
        },
        CommerceCar: {
          name: "Коммерческие автомобили",
          properties: {
            mark: "Марка",
            model: "Модель",
            year: "Год выпуска",
            cost: "Цена",
            milage: "Пробег",
            engine: "Двигатель",
            volume: "Объем",
            horsepower: "Лошадиные силы",
            drive: "Привод",
            checkpoint: "Коробка передач",
            statement: "Состояние",
            description: "Описание",
            authoremail: "Email автора",
            rate: "Оплата",
            seen: "Просмотры",
            liked: "Лайки",
            liked_user: "Понравилось пользователям",
          },
        },
        Users: {
          name: "Пользователи",
          properties: {
            name: "Имя пользователя",
            email: "Электронная почта",
            password: "Пароль",
            role: "Роль",
            userrate: "Тариф",
          },
        },
        Cart: {
          name: "Корзина",
          properties: {
            user_id: "Пользователь",
            product_id: "Идентификатор товара",
            product_type: "Тип товара",
            quantity: "Количество",
            added_time: "Дата добавления",
          },
        },
        News: {
          name: "Новости",
          properties: {
            title: "Заголовок",
            content: "Содержание",
            vehicle: "Транспорт",
            author: "Автор",
            image: "Изображение",
          },
        },
        Mark: {
          name: "Марки",
          properties: {
            mark_name: "Название марки",
            image: "Изображение",
          },
        },
        Country: {
          name: "Страны",
          properties: {
            name: "Название",
            image: "Изображение",
            description: "Описание",
          },
        },
        Offer: {
          name: "Предложения",
          properties: {
            name: "Имя",
            surname: "Фамилия",
            phone: "Телефон",
          },
        },
        Banner: {
          name: "Баннеры",
          properties: {
            title: "Заголовок",
            subtitle: "Подзаголовок",
            image: "Изображение",
          },
        },
        Chat: {
          name: "Чаты",
          properties: {
            sender_id: "ID отправителя",
            receiver_id: "ID получателя",
            message: "Сообщение",
            timestamp: "Время отправки",
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
