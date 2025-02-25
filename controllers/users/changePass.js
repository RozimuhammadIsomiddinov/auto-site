const { comparePassword } = require("../../data/functions/users");
const Users = require("../../data/models/user");
const bcrypt = require("bcrypt");

const changePassword = async (req, res) => {
  const { oldPass, newPass } = req.body;
  const { id } = req.params;

  if (!oldPass || !newPass || !id)
    return res.status(400).json({
      error: "you have to fill all field",
    });
  try {
    const user = await Users.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const bool = await comparePassword(oldPass, user.dataValues.password);
    if (!bool) {
      return res.status(404).json({
        message: "old password is incorrect",
      });
    }
    const hashedPassword = await bcrypt.hash(newPass, 10);

    const updatePass = await user.update({
      password: hashedPassword,
    });
    res.json({
      message: "successfully updated",
      updatedUser: updatePass,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  changePassword,
};
