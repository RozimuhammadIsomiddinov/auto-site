const { updateCar, getCarById } = require("../../data/functions/autombiles.js");
const Users = require("../../data/models/user.js");

const updateCarMid = async (req, res, next) => {
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
    if (!id) {
      return res.status(400).json({ message: "Car ID is required" });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).send("you have to upload at least 1 picture");
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
