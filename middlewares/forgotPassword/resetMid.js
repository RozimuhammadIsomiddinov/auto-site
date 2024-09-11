import Users from "../../data/models/user.js";
import jwt from "jsonwebtoken";
export const resetMid = async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ error: "Invalid token" });
    }

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.json({ message: "Password reset successful" });
    next();
  } catch (error) {
    res.status(500).json({ error: "Error resetting password" });
  }
};
