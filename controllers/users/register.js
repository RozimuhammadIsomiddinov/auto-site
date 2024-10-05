const Users = require("../../data/models/user.js");
const { generateJWT } = require("../../data/functions/users.js");
const { mailer } = require("../../config/nodemailer.js");
const dotenv = require("dotenv");
dotenv.config();
const registerMid = async (req, res) => {
  const { name, email, password, role, userrate } = req.body;
  try {
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const user = await Users.create({
      name,
      email,
      password,
      role,
      userrate,
    });
    if (userrate) {
      user.userrate = userrate;
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
