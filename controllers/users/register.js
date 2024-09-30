const Users = require("../../data/models/user.js");
const { generateJWT } = require("../../data/functions/users.js");
const { mailer } = require("../../config/nodemailer.js");
const dotenv = require("dotenv");
dotenv.config();
const registerMid = async (req, res) => {
  const { name, email, password, role, userRate } = req.body;
  try {
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    let imagePath = null;
    if (req.file) {
      imagePath = `${process.env.BACKEND_URL}/${req.file.filename}`;
    }

    const user = await Users.create({
      image: imagePath,
      name,
      email,
      password,
      role,
      userrate: userRate,
    });
    if (userRate) {
      user.userRate = userRate;
    }
    const token = generateJWT(user);

    const message = {
      to: email,
      subject: `Congratulations ${name}! You have successfully registered.`,
    };
    await mailer(message);

    res.status(201).json({
      token,
      userData: user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Registration failed", details: error.message });
  }
};

module.exports = { registerMid };
