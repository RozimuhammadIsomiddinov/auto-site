const News = require("../models/news");

//read
const getByIdNews = async (id) => {
  try {
    const news = await News.findByPk(id);
    return news;
  } catch (e) {
    return e.message;
  }
};

const getAllNews = async (page = 1, pageSize = 10) => {
  try {
    const offset = (page - 1) * pageSize;
    const news = await News.findAll({
      limit: pageSize,
      offset: offset,
    });
    return news;
  } catch (e) {
    return "Error getting news:" + e.message;
  }
};

const getVehicle = async (page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    const vehicleNews = await News.findAll({
      where: { vehicle: true },
      limit: pageSize,
      offset,
    });
    return vehicleNews;
  } catch (e) {
    return "Error getting vehicle news:" + e.message;
  }
};
//create

const createNews = async (newsData) => {
  try {
    const newData = await News.create(newsData);
    return newData;
  } catch (e) {
    return "Error adding news: " + e.message;
  }
};

//update

const updateNews = async (upData) => {
  const { body, params } = upData;
  const { title, content, image } = body;
  try {
    const news = await News.findByPk(params.id);
    if (!news) return { error: "News not found" };
    const updateNew = await news.update({
      title,
      content,
      image,
    });
    return updateNew;
  } catch (e) {
    return "Error updating news: " + e.message;
  }
};

//delete

const deleteNews = async (id) => {
  try {
    const result = await News.destroy({ where: { id } });
    return result;
  } catch (err) {
    return "Error deleting news: " + err.message;
  }
};

module.exports = {
  getAllNews,
  getByIdNews,
  createNews,
  updateNews,
  deleteNews,
  getVehicle,
};
