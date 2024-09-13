import Car from "../../data/models/automobile.js";
import dotenv from "dotenv";
dotenv.config();
export const createMidCar = async (req, res, next) => {
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
      checkpoint,
      doors,
      body,
      statement,
      description,
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).send("You must upload at least one image.");
    }

    const imagePaths = req.files.map(
      (file) => `${process.env.BACKEND_URL}/uploads/${file.filename}`
    );

    const newCar = await Car.create({
      image: imagePaths,
      country,
      year,
      cost,
      milage,
      fuel,
      volume,
      horsepower,
      drive,
      checkpoint,
      doors,
      body,
      statement,
      description,
    });

    res.status(201).json({
      message: "Car added successfully",
      car: newCar,
    });
    next();
  } catch (e) {
    return res.status(400).send("Error in createMidCar:\n" + e.message);
  }
};
