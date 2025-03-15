import Users from "../../data/models/user.js";

export const changeNameEmail = async (req, res) => {
  const { newName, newEmail } = req.body;
  const { id } = req.params;

  if (!newName || !newEmail || !id) {
    return res.status(400).json({
      error: "You have to fill all fields",
    });
  }

  try {
    const user = await Users.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.update({ name: newName, email: newEmail });

    res.json({
      message: "Successfully updated",
      updatedUser: { id: user.id, name: newName, email: newEmail },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
