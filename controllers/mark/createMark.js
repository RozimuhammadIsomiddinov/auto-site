const dotenv = require("dotenv");
const Mark = require("../../data/models/carMark");
dotenv.config();

const createMark = async (req, res, next) => {
  try {
    const { markName } = req.query;
    if (!req.file) {
      return res.status(400).send("you have to upload at least 1 picture");
    }
    const imagePaths = `${process.env.BACKEND_URL}/${req.file?.filename}`;
    const newMark = await Mark.create({
      image: imagePaths,
      mark_name: markName,
    });
    res.status(201).json({
      message: "Mark successfully added",
      commerceCar: newMark,
    });
  } catch (e) {
    return res.status(400).send("createMark xatoligi:\n" + e.message);
  }
};
module.exports = { createMark };
