const dotenv = require("dotenv");
const Country = require("../../data/models/country");
dotenv.config();

const createCountry = async (req, res) => {
  try {
    const { name } = req.body;
    if (!req.file) {
      return res.status(400).send("you have to upload  1 picture");
    }
    const imagePaths = `${process.env.BACKEND_URL}/${req.file.filename}`;
    const newData = {
      name,
      image: imagePaths,
    };
    const result = await Country.create(newData);
    if (!result) return res.status(400).json({ message: "flag does'nt saved" });
    res.status(201).json({ message: "succesfully", result });
  } catch (e) {
    return res.status(400).send("error of createcountry:\n" + e.message);
  }
};

module.exports = createCountry;
