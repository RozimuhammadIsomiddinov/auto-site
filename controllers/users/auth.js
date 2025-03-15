import jwt from "jsonwebtoken";
import Users from "../../data/models/user.js";
import { createdVehicles } from "../../data/functions/users.js";

const authenticate = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // bearer token
  if (!token) {
    return res.status(401).json({ error: "Access denied, token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findByPk(decoded.id);
    const result = await createdVehicles(user.email);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = user; // Attaching user info to request object
    res.status(200).json({
      message: `Welcome`,
      userData: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      yours: { result },
    });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default authenticate;
