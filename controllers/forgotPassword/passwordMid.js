import Users from "../../data/models/user.js";
import jwt from "jsonwebtoken";
import { transporter } from "../../config/nodemailer.js";

export const passwordMid = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const resetLink = `${req.protocol}://${req.get(
      "host"
    )}/reset-password/${resetToken}`;
    const mailOptions = {
      from: '"Your App" <noreply@yourapp.com>',
      to: email,
      subject: "Password Reset",
      text: `Reset your password using this link: ${resetLink}`,
    };
    await transporter.sendMail(mailOptions);
    console.log("xa");

    res
      .status(200)
      .json({ message: "Password reset email sent", token: resetToken });
    next();
  } catch (err) {
    res.status(500).json({
      error: `Error sending email 
    ${err.message}`,
    });
  }
};
