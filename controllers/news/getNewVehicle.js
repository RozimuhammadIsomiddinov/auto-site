import Banner from "../../data/models/banner.js";
import dotenv from "dotenv";
dotenv.config();
const baseUrl = process.env.BACKEND_URL;

export const getNewVehicleMid = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    const banners = await Banner.findAll({ limit: pageSize, offset });

    const updatedResult = banners.map((b) => {
      const { id, title, image, subtitle } = b.dataValues;
      return {
        id,
        title,
        subtitle,
        image: image.map((img) =>
          img.startsWith("http") ? img : baseUrl + "/" + img
        ),
      };
    });

    res.status(200).json(updatedResult);
  } catch (err) {
    res.status(400).json({
      message: "Error from getNewVehicleMid",
      error: err.message,
    });
  }
};

export const createBanner = async (req, res) => {
  try {
    const { title, image, subtitle } = req.body;
    if (!title || !image || !subtitle) {
      return res.status(400).json({
        message: "Title, image, and subtitle are required.",
      });
    }

    const newBanner = await Banner.create({
      title,
      image,
      subtitle,
    });

    res.status(201).json({
      message: "Banner created successfully.",
      banner: newBanner,
    });
  } catch (error) {
    console.error("Error creating banner:", error);
    res.status(500).json({
      message: "Error creating banner",
      error: error.message,
    });
  }
};
