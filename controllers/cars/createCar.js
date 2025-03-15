import dotenv from "dotenv";
import Car from "../../data/models/automobile.js";
import Users from "../../data/models/user.js";

dotenv.config();

export const createMidCar = async (req, res) => {
  try {
    const {
      color,
      country,
      year,
      cost,
      milage,
      engine,
      volume,
      horsepower,
      drive,
      checkpoint,
      doors,
      body,
      statement,
      description,
      authoremail,
      rate,
      mark_id,
      model,
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).send("you have to upload at least 1 picture");
    }

    const author = await Users.findOne({ where: { email: authoremail } });
    if (!author) {
      return res.status(400).json({
        message: "you have to be registration",
        method: "post",
      });
    }

    const imagePaths = req.files.map(
      (file) => `${process.env.BACKEND_URL}/${file?.filename}`
    );

    const newCar = await Car.create({
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
      checkpoint,
      doors,
      body,
      statement,
      description,
      authoremail,
      rate,
      mark_id,
      model,
    });

    res.status(201).json({
      message: "car successfully added",
      car: newCar,
    });
  } catch (e) {
    return res.status(400).send("error of createMidCar:\n" + e.message);
  }
};
