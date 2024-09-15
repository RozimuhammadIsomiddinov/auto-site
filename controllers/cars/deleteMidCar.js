const { deleteCar, getCarById } = require("../../data/functions/autombiles.js");

const deleteMidCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await getCarById(id);
    if (!car) {
      return res.status(404).send("car not found in DB");
    }
    const result = await deleteCar(id); //returns array
    res.status(200).send("Product deleted");
    next();
  } catch (er) {
    return res.status(400).send("Error from deleteMidCar: " + er.message);
  }
};

module.exports = { deleteMidCar };
