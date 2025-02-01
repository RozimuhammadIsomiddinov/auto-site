const { getCarById } = require("../../data/functions/autombiles.js");
const Mark = require("../../data/models/carMark.js");
const Users = require("../../data/models/user.js");

const getMidById = async (req, res) => {
  try {
    const result = await getCarById(req.params.id);
    if (!result) {
      return res
        .status(404)
        .json({ message: `Car with ID: ${req.params.id} not found` });
    }
    if (!result.authoremail) {
      return res
        .status(400)
        .json({ message: "Car does not have an author email." });
    }

    const dataEmail = result.authoremail;
    const findUser = await Users.findOne({ where: { email: dataEmail } });

    if (!findUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    await result.update({ seen: (result.seen || 0) + 1 });

    const mark_name = await Mark.findByPk(result.mark_id);
    result.mark_name = mark_name || null;

    res.status(200).json({ result, userData: findUser });
  } catch (err) {
    if (!res.headersSent) {
      res
        .status(400)
        .json({ message: "Error from getMidById", error: err.message });
    }
  }
};

module.exports = { getMidById };
