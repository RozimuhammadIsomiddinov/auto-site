const Users = require("../../data/models/user");

const changeNameEmail = async (req, res) => {
  const { newName, newEmail } = req.body;
  const { id } = req.params;
  if (!newName || !newEmail || !id)
    return res.status(404).json({
      error: "you have to fill all field",
    });
  try {
    const user = await Users.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const updateNameEmail = await user.update({
      name: newName,
      email: newEmail,
    });
    res.json({
      message: "successfully updated",
      updatedUser: updateNameEmail,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = { changeNameEmail };
