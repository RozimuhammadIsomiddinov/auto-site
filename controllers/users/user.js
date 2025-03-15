import Users from "../../data/models/user.js";

export const getByIDuser = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "send a user's id" });

  const userId = Number(id);
  if (isNaN(userId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const result = await Users.findByPk(userId);
    if (!result) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
