import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import Car from "../models/automobile.js";
import Motorcycle from "../models/moto.js";
import CommerceCar from "../models/commerce.js";
import logger from "../../logs/logs.js";

dotenv.config();

// Function to generate JWT
export const generateJWT = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "48h",
  });
};

// Function to compare passwords
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const createdVehicles = async (email) => {
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
