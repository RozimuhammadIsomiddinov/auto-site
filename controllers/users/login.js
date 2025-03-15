import Users from "../../data/models/user.js";
import { generateJWT, comparePassword } from "../../data/functions/users.js";

export const loginMid = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateJWT(user);
    res.status(200).json({
      token,
      userData: {
        id: user.id,
        image: user.image,
        name: user.name,
        email: user.email,
        role: user.role,
        rate: user.userrate,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
