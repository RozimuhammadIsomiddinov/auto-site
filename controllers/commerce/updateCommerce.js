const {
  updateCommerceCar,
  getCommerceCarById,
} = require("../../data/functions/commerceCar.js");
const CommerceCar = require("../../data/models/commerce.js");
const Users = require("../../data/models/user.js");

const updateCommerceCarMid = async (req, res) => {
  try {
    const { id } = req.params;
    const { authoremail } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Commerce car ID is required" });
    }

    const commerce = await CommerceCar.findByPk(id);
    if (!commerce) {
      return res.status(404).json({ message: "Car not found" });
    }

    if (commerce.authoremail !== authoremail) {
      return res.status(400).json({
        message: "This product is not yours",
        method: "post",
        path: `http://212.67.11.143:4035/user-register`,
      });
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
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Error from updateCommerceCarMid", error: err.message });
  }
};

module.exports = { updateCommerceCarMid };
