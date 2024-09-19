const {
  updateCommerceCar,
  getCommerceCarById,
} = require("../../data/functions/commerceCar.js");

const updateCommerceCarMid = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Commerce car ID is required" });
    }

    const car = await getCommerceCarById(id);
    if (!car) {
      return res.status(404).json({ message: "Commerce car not found" });
    }

    const updatedCar = await updateCommerceCar(req);

    if (updatedCar.error) {
      return res.status(404).json({ message: updatedCar.error });
    }

    res
      .status(200)
      .json({ message: "Commerce car successfully updated", data: updatedCar });

    next();
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Error from updateCommerceCarMid", error: err.message });
  }
};

module.exports = { updateCommerceCarMid };
