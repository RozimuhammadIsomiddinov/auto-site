const {
  updateMotorcycle,
  getMotorcycleById,
} = require("../../data/functions/motos.js");
const Users = require("../../data/models/user.js");

const updateMotorcycleMid = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { authorEmail } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Motorcycle ID is required" });
    }

    const existingMotorcycle = await getMotorcycleById(id);

    if (!existingMotorcycle) {
      return res.status(404).json({ message: "Motorcycle not found" });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).send("you have to upload at least 1 picture");
    }
    const author = await Users.findOne({ where: { email: authorEmail } });
    if (!author)
      return res.status(400).json({
        message: "you have to be registration",
        method: "post",
        path: `http://212.67.11.143:4035/user-register`,
      });

    const result = await updateMotorcycle(req);

    if (result.error) {
      return res.status(400).json({ message: result.error });
    }

    res
      .status(200)
      .json({ message: "Motorcycle successfully updated", data: result });

    next();
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Error from updateMotorcycleMid", error: err.message });
  }
};

module.exports = { updateMotorcycleMid };
