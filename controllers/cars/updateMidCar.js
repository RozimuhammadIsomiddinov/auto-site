const { updateCar, getCarById } = require("../../data/functions/autombiles.js");

const updateCarMid = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Car ID is required" });
    }

    const result = await updateCar(req);

    if (result.error) {
      return res.status(404).json({ message: result.error });
    }

    res.status(200).json({ message: "Car successfully updated", data: result });

    next();
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Error from updateMidCar", error: err.message });
  }
};

module.exports = { updateCarMid };
