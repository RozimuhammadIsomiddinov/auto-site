import CommerceCar from "../../data/models/commerce.js";
import Users from "../../data/models/user.js";
import dotenv from "dotenv";

dotenv.config();

// Create a new commerce car
export const createCommerceCar = async (req, res) => {
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
      body,
      statement,
      description,
      authoremail,
      rate,
      mark_id,
      model,
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).send("You have to upload at least 1 picture");
    }

    const author = await Users.findOne({ where: { email: authoremail } });
    if (!author) {
      return res.status(400).json({
        message: "You have to be registered",
        method: "post",
      });
    }

    const imagePaths = req.files.map(
      (file) => `${process.env.BACKEND_URL}/${file?.filename}`
    );

    const newCommerceCar = await CommerceCar.create({
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
      body,
      statement,
      description,
      authoremail,
      rate,
      mark_id,
      model,
    });

    res.status(201).json({
      message: "Commerce car successfully added",
      commerceCar: newCommerceCar,
    });
  } catch (e) {
    return res.status(400).send("createCommerceCar xatoligi:\n" + e.message);
  }
};
