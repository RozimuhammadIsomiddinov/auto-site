const CommerceCar = require("../../data/models/commerce.js");
const Users = require("../../data/models/user.js");

const dotenv = require("dotenv");
dotenv.config();

// Create a new commerce car
const createCommerceCar = async (req, res, next) => {
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
      stock,
      authorEmail,
      rate,
      mark,
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).send("you have to upload at least 1 picture");
    }
    const author = await Users.findOne({ where: { email: authorEmail } });
    if (!author)
      return res.status(400).json({
        message: "you have to be registration",
        method: "post",
        path: `http://212.67.11.143:4035/user-register`,
      });
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
      doors,
      body,
      statement,
      description,
      stock,
      authoremail: authorEmail,
      rate,
      mark,
    });

    res.status(201).json({
      message: "Commerce car successfully added",
      commerceCar: newCommerceCar,
    });
    next();
  } catch (e) {
    return res.status(400).send("createCommerceCar xatoligi:\n" + e.message);
  }
};

module.exports = {
  createCommerceCar,
};
