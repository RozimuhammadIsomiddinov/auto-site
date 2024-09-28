const { createNews } = require("../../data/functions/news");
const dotenv = require("dotenv");
dotenv.config();

const createMidNews = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content)
      return res.status(400).json({ message: "you have to fill all field" });
    console.log(req.body);
    if (!req.file) {
      return res.status(400).send("You have to upload at least 1 picture");
    }

    const imagePaths = `${process.env.BACKEND_URL}/${req.file.filename}`;
    const newData = {
      title,
      content,
      image: imagePaths,
    };
    const createNew = await createNews(newData);
    res.status(201).json({
      message: "succesfully added",
      news: createNew,
    });
    next();
  } catch (e) {
    return res.status(400).send("error of createMidNews:\n" + e.message);
  }
};
module.exports = { createMidNews };
