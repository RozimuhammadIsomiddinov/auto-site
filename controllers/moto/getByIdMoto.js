const { getMotorcycleById } = require("../../data/functions/motos.js");
const Users = require("../../data/models/user.js");

const getMidMotorcycleById = async (req, res) => {
  try {
    const result = await getMotorcycleById(req.params.id);
    const dataEmail = result.dataValues.authoremail;
    const findUser = await Users.findOne({ where: { email: dataEmail } });
    if (!result) {
      return res.status(404).json({ message: "Motorcycle not found!" });
    }
    await result.update({ seen: (result.seen || 0) + 1 });

    res.status(200).json({ result, userData: findUser });
  } catch (err) {
    if (!res.headersSent) {
      res.status(400).json({
        message: "Error from getMidMotorcycleById",
        error: err.message,
      });
    }
  }
};
module.exports = { getMidMotorcycleById };
