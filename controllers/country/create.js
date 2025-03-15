import dotenv from "dotenv";
import Country from "../../data/models/country.js";

dotenv.config();

export const createCountry = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!req.file) {
      return res.status(400).send("You have to upload 1 picture");
    }

    const imagePaths = `${process.env.BACKEND_URL}/${req.file.filename}`;
    const newData = {
      name,
      image: imagePaths,
      description,
    };

    const result = await Country.create(newData);
    if (!result) {
      return res.status(400).json({ message: "Flag doesn't saved" });
    }

    res.status(201).json({ message: "Successfully created", result });
  } catch (e) {
    return res.status(400).send("Error of createCountry:\n" + e.message);
  }
};
