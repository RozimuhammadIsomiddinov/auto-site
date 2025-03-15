import bcrypt from "bcrypt";
import Users from "../../data/models/user.js";
import { comparePassword } from "../../data/functions/users.js";

export const changePassword = async (req, res) => {
  const { oldPass, newPass } = req.body;
  const { id } = req.params;

  if (!oldPass || !newPass || !id) {
    return res.status(400).json({
      error: "You have to fill all fields",
    });
  }

  try {
    const user = await Users.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await comparePassword(oldPass, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Old password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPass, 10);
    await user.update({ password: hashedPassword });

    res.json({
      message: "Password successfully updated",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
