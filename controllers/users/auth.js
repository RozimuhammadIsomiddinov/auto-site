import jwt from "jsonwebtoken";
import Users from "../../data/models/user.js";

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; //beareer token
  if (!token) {
    return res.status(401).json({ error: "Access denied, token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = user; // Attaching user info to request object
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default authenticate;
