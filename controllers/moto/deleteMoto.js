const {
  deleteMotorcycle,
  getMotorcycleById,
} = require("../../data/functions/motos.js");
const Users = require("../../data/models/user.js");

const deleteMidMotorcycle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { authorEmail } = req.body;

    const author = await Users.findOne({ where: { email: authorEmail } });
    if (!author)
      return res.status(400).json({
        message: "you have to be registration",
        method: "post",
        path: `http://212.67.11.143:4035/user-register`,
      });
    const motorcycle = await getMotorcycleById(id);

    if (!motorcycle) {
      return res.status(404).send("Motorcycle not found in DB");
    }

    const result = await deleteMotorcycle(id);
    res.status(200).send("Motorcycle deleted");
    next();
  } catch (er) {
    return res
      .status(400)
      .send("Error from deleteMidMotorcycle: " + er.message);
  }
};

module.exports = { deleteMidMotorcycle };
