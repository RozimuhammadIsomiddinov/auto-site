import Users from "../../data/models/user.js";
import { generateJWT } from "../../data/functions/users.js";
import { mailer } from "../../config/nodemailer.js";

export const passwordMid = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const resetToken = generateJWT(user);
    const resetPasswordLink = `${process.env.BACKEND_URL}/reset-password/${resetToken}`;
    const mailOptions = {
      to: email,
      subject: "Password Reset",
      text: `Reset your password using this link: ${resetPasswordLink}`,
    };
    await mailer(mailOptions);

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
