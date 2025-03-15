import dotenv from "dotenv";
import Motorcycle from "../../data/models/moto.js";
import Users from "../../data/models/user.js";

dotenv.config();

const createMidMotorcycle = async (req, res) => {
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
      mark_id,
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).send("You must upload at least one image.");
    }

    const author = await Users.findOne({ where: { email: authoremail } });
    if (!author)
      return res.status(400).json({
        message: "you have to be registered",
        method: "post",
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
      mark_id,
    });

    res.status(201).json({
      message: "Motorcycle added successfully",
      motorcycle: newMotorcycle,
    });
  } catch (e) {
    return res.status(400).send("Error in createMidMotorcycle:\n" + e.message);
  }
};

export { createMidMotorcycle };
