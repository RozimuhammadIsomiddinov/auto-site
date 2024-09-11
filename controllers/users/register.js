import Users from "../../data/models/user.js";
import { generateJWT } from "../../data/functions/users.js";

export const registerMid = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = await Users.create({ name, email, password, role });

    const token = generateJWT(user);
    res.status(201).json({ token });
  } catch (error) {
    console.error("Registration error:", error.message);
    res
      .status(500)
      .json({ error: "Registration failed", details: error.message });
  }
};
