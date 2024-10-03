const Motorcycle = require("../../data/models/moto.js");
const Users = require("../../data/models/user.js");
const dotenv = require("dotenv");
dotenv.config();

const createMidMotorcycle = async (req, res, next) => {
  try {
    const {
      country,
      color,
      year,
      cost,
      milage,
      engine,
      volume,
      horsepower,
      drive,
      transmission,
      body,
      condition,
      description,
      authoremail,
      rate,
      model,
      mark,
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).send("You must upload at least one image.");
    }

    const author = await Users.findOne({ where: { email: authoremail } });
    if (!author)
      return res.status(400).json({
        message: "you have to be registered",
        method: "post",
        path: `http://212.67.11.143:4035/user-register`,
      });

    const imagePaths = req.files.map(
      (file) => `${process.env.BACKEND_URL}/${file.filename}`
    );

    const newMotorcycle = await Motorcycle.create({
      image: imagePaths,
      color,
      country,
      year,
      cost,
      milage,
      engine,
      volume,
      horsepower,
      drive,
      transmission,
      body,
      condition,
      description,
      authoremail,
      rate,
      model,
      mark,
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

module.exports = { createMidMotorcycle };
