const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();

// Function to generate JWT
const generateJWT = function (user) {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Function to compare passwords
const comparePassword = async function (password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
  generateJWT,
  comparePassword,
};
