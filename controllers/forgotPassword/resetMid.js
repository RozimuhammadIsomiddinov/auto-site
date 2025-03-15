import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../../data/models/user.js";

export const resetMid = async (req, res) => {
  const { newPassword } = req.body;
  const { token } = req.params;

  if (!token || !newPassword)
    return res.status(400).json({ error: "you have to enter all fields" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Users.findOne({ where: { id: decoded.id } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password successfully reset" });
  } catch (err) {
    res.status(400).json({ error: `Reset failed: ${err.message}` });
  }
};
