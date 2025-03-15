import dotenv from "dotenv";
import Mark from "../../data/models/carMark.js";

dotenv.config();

export const createMark = async (req, res) => {
  try {
    const { mark_name } = req.body;

    if (!req.file) {
      return res.status(400).send("You have to upload at least 1 picture.");
    }

    const imagePaths = `${process.env.BACKEND_URL}/${req.file.filename}`;

    const newMark = await Mark.create({
      image: imagePaths,
      mark_name,
    });

    res.status(201).json({
      message: "Mark successfully added",
      commerceCar: newMark,
    });
  } catch (e) {
    return res.status(400).json({ error: "createMark error: " + e.message });
  }
};
