const { deleteCar, getCarById } = require("../../data/functions/autombiles.js");
const Car = require("../../data/models/automobile.js");
const Users = require("../../data/models/user.js");

const deleteMidCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { authoremail } = req.query;
    if (!id) {
      return res.status(400).json({ message: "Car ID is required" });
    }
    const car = await Car.findByPk(id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    if (car.authoremail !== authoremail) {
      return res.status(400).json({
        message: "This product is not yours",
        method: "post",
        path: `http://212.67.11.143:4035/user-register`,
      });
    }

    await deleteCar(id); //returned array
    res.status(200).send("Product deleted");
  } catch (er) {
    return res.status(400).send("Error from deleteMidCar: " + er.message);
  }
};

module.exports = { deleteMidCar };
