const {
  deleteMotorcycle,
  getMotorcycleById,
} = require("../../data/functions/motos.js");
const Motorcycle = require("../../data/models/moto.js");
const Users = require("../../data/models/user.js");

const deleteMidMotorcycle = async (req, res) => {
  try {
    const { id } = req.params;
    const { authoremail } = req.query;
    if (!id) {
      return res.status(400).json({ message: "moto ID is required" });
    }

    const moto = await Motorcycle.findByPk(id);

    if (!moto) {
      return res.status(404).json({ message: "moto not found" });
    }

    if (moto.authoremail !== authoremail) {
      return res.status(400).json({
        message: "This product is not yours",
        method: "post",
        path: `http://212.67.11.143:4035/user-register`,
      });
    }
    const motorcycle = await getMotorcycleById(id);

    if (!motorcycle) {
      return res.status(404).send("Motorcycle not found in DB");
    }

    const result = await deleteMotorcycle(id);
    res.status(200).send("Motorcycle deleted");
  } catch (er) {
    return res
      .status(400)
      .send("Error from deleteMidMotorcycle: " + er.message);
  }
};

module.exports = { deleteMidMotorcycle };
