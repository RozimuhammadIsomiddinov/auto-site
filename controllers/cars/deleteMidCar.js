const { deleteCar, getCarById } = require("../../data/functions/autombiles.js");
const Users = require("../../data/models/user.js");

const deleteMidCar = async (req, res, next) => {
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
