const {
  updateCommerceCar,
  getCommerceCarById,
} = require("../../data/functions/commerceCar.js");
const Users = require("../../data/models/user.js");

const updateCommerceCarMid = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { authorEmail } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Commerce car ID is required" });
    }

    const author = await Users.findOne({ where: { email: authorEmail } });
    if (!author)
      return res.status(400).json({
        message: "you have to be registration",
        method: "post",
        path: `http://212.67.11.143:4035/user-register`,
      });
    if (!req.files || req.files.length === 0) {
      return res.status(400).send("you have to upload at least 1 picture");
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
