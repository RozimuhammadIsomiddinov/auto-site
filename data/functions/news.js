import News from "../models/news.js";
import dotenv from "dotenv";

dotenv.config();

const baseUrl = process.env.BACKEND_URL;
// read
export const getByIdNews = async (id) => {
  try {
    id = parseInt(id);

    const news = await News.findByPk(id);

    return {
      id: news.id,
      title: news.title,
      content: news.content,
      vehicle: news.vehicle,
      author: news.author,
      image: news.image.startsWith("http")
        ? news.image
        : `${baseUrl}/${news.image}`,
    };
  } catch (e) {
    throw new Error("Error getting news by ID: " + e.message);
  }
};

export const getAllNews = async (page = 1, pageSize = 10) => {
  try {
    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 10;
    const offset = (page - 1) * pageSize;

    const news = await News.findAll({ limit: pageSize, offset });

    return news.map((n) => ({
      id: n.id,
      title: n.title,
      content: n.content,
      vehicle: n.vehicle,
      author: n.author,
      image: n.image.startsWith("http") ? n.image : `${baseUrl}/${n.image}`,
    }));
  } catch (e) {
    throw new Error("Error getting news: " + e.message);
  }
};

export const getVehicle = async (page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    const vehicleNews = await News.findAll({
      where: { vehicle: true },
      limit: pageSize,
      offset,
    });
    return vehicleNews;
  } catch (e) {
    return "Error getting vehicle news: " + e.message;
  }
};

// create
export const createNews = async (newsData) => {
  try {
    const newData = await News.create(newsData);
    return newData;
  } catch (e) {
    return "Error adding news: " + e.message;
  }
};

// update
export const updateNews = async (upData) => {
  const { body, params } = upData;
  const { title, content, image, vehicle } = body;
  try {
    const news = await News.findByPk(params.id);
    if (!news) return { error: "News not found" };
    const updateNew = await news.update({
      title,
      content,
      vehicle,
      image,
    });
    return updateNew;
  } catch (e) {
    return "Error updating news: " + e.message;
  }
};

// delete
export const deleteNews = async (id) => {
  try {
    const result = await News.destroy({ where: { id } });
    return result;
  } catch (err) {
    return "Error deleting news: " + err.message;
  }
};
