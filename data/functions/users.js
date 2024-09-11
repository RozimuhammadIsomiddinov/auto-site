import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

// Function to generate JWT
export const generateJWT = function (user) {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1m",
  });
};

// Function to compare passwords
export const comparePassword = async function (password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
};
