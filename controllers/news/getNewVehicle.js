const Banner = require("../../data/models/banner");

const getNewVehicleMid = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    const banner = await Banner.findAll({ limit: pageSize, offset });
    res
      .status(200)
      .json({ message: banner.length != 0 ? banner : "banner has not yet" });
  } catch (err) {
    res.status(400).json({
      message: "Error from getMidNewVehicle",
      error: err.message,
    });
  }
};

const createBanner = async (req, res) => {
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
module.exports = { getNewVehicleMid, createBanner };
