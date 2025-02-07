const Users = require("../../data/models/user.js");
const { generateJWT } = require("../../data/functions/users.js");
const { mailer } = require("../../config/nodemailer.js");

const passwordMid = async (req, res) => {
  const { email } = req.body;
  if (!email)
    return res.status(400).json({ error: "you have to enter your email" });
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
  } catch (err) {
    res.status(500).json({
      error: `Error sending email: ${err.message}`,
    });
  }
};

module.exports = { passwordMid };
