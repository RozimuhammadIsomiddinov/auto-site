const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const Car = require("../models/automobile");
const Motorcycle = require("../models/moto");
const CommerceCar = require("../models/commerce");
const logger = require("../../logs/logs");

dotenv.config();

// Function to generate JWT
const generateJWT = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "48h",
  });
};

// Function to compare passwords
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const createdVehicles = async (email) => {
  try {
    const cars = await Car.findAll({
      where: { authoremail: email, archived: false },
    });
    const motos = await Motorcycle.findAll({
      where: { authoremail: email, archived: false },
    });
    const commerce = await CommerceCar.findAll({
      where: { authoremail: email, archived: false },
    });

    return {
      cars: cars.map((car) => car.dataValues),
      motos: motos.map((moto) => moto.dataValues),
      commerce: commerce.map((comm) => comm.dataValues),
    };
  } catch (error) {
    logger.error("Error fetching vehicles:", error.message);
  }
};
module.exports = {
  generateJWT,
  comparePassword,
  createdVehicles,
};
