import Motorcycle from "../../data/models/moto.js";
import dotenv from "dotenv";
dotenv.config();

export const createMidMotorcycle = async (req, res, next) => {
  try {
    const {
      country,
      year,
      cost,
      milage,
      fuel,
      volume,
      horsepower,
      drive,
      transmission,
      body,
      condition,
      description,
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).send("You must upload at least one image.");
    }

    const imagePaths = req.files.map(
      (file) => `${process.env.BACKEND_URL}/uploads/${file.filename}`
    );

    const newMotorcycle = await Motorcycle.create({
      image: imagePaths,
      country,
      year,
      cost,
      milage,
      fuel,
      volume,
      horsepower,
      drive,
      transmission,
      body,
      condition,
      description,
    });

    res.status(201).json({
      message: "Motorcycle added successfully",
      motorcycle: newMotorcycle,
    });
    next();
  } catch (e) {
    return res.status(400).send("Error in createMidMotorcycle:\n" + e.message);
  }
};
