import { createNews } from "../../data/functions/news.js";
import dotenv from "dotenv";

dotenv.config();

const createMidNews = async (req, res) => {
  try {
    const { title, content, vehicle } = req.body;

    if (!title || !content)
      return res.status(400).json({ message: "You have to fill all fields" });

    if (!req.file) {
      return res.status(400).send("You have to upload at least 1 picture");
    }

    const imagePaths = `${process.env.BACKEND_URL}/${req.file.filename}`;
    const newData = {
      title,
      content,
      vehicle,
      image: imagePaths,
    };

    const createNew = await createNews(newData);

    res.status(201).json({
      message: "Successfully added",
      createNew,
    });
  } catch (e) {
    return res.status(400).send("Error in createMidNews:\n" + e.message);
  }
};

export { createMidNews };
