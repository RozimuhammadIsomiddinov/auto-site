const Users = require("../../data/models/user");

const getByIDuser = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "send a users id" });
  const userId = Number(id);
  if (isNaN(userId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const result = await Users.findByPk(id);
    if (!result) return res.status(404).json({ message: "user not found" });
    return res.status(200).json(result);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};
module.exports = { getByIDuser };
