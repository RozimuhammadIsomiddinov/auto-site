const Users = require("../../data/models/user.js");
const { generateJWT } = require("../../data/functions/users.js");
const { mailer } = require("../../config/nodemailer.js");

const registerMid = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existingUser = await Users.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const user = await Users.create({ name, email, password, role });
    const token = generateJWT(user);

    const message = {
      to: email,
      subject: `Congratulations ${name}! You have successfully registered.`,
    };
    await mailer(message);

    res.status(201).json({
      token,
      userData: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    res
      .status(500)
      .json({ error: "Registration failed", details: error.message });
  }
};

module.exports = { registerMid };
