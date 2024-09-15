const {
  updateMotorcycle,
  getMotorcycleById,
} = require("../../data/functions/motos.js");

const updateMotorcycleMid = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Motorcycle ID is required" });
    }

    const existingMotorcycle = await getMotorcycleById(id);
    if (!existingMotorcycle) {
      return res.status(404).json({ message: "Motorcycle not found" });
    }

    const result = await updateMotorcycle({ body: req.body, params: { id } });

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
