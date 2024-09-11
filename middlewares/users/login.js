import Users from "../../data/models/user.js";
import { generateJWT, comparePassword } from "../../data/functions/users.js";

export const loginMid = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await comparePassword(password, user.dataValues.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateJWT(user);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};
