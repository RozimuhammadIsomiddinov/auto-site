const Car = require("../../data/models/automobile.js");
const dotenv = require("dotenv");
dotenv.config();

const createMidCar = async (req, res, next) => {
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
      return res.status(400).send("Siz kamida bitta rasm yuklashingiz kerak.");
    }

    const imagePaths = req.files.map(
      (file) => `${process.env.BACKEND_URL}/${file?.filename}`
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
      message: "Mashina muvaffaqiyatli qo'shildi",
      car: newCar,
    });
    next();
  } catch (e) {
    return res.status(400).send("createMidCar xatoligi:\n" + e.message);
  }
};

module.exports = { createMidCar };
