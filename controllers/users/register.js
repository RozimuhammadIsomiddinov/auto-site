import dotenv from "dotenv";
import Users from "../../data/models/user.js";
import { generateJWT } from "../../data/functions/users.js";
import { mailer } from "../../config/nodemailer.js";

dotenv.config();

export const registerMid = async (req, res) => {
  const { name, email, password, role, userrate } = req.body;
  try {
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const user = await Users.create({ name, email, password, role, userrate });

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
