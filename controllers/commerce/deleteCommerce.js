const {
  deleteCommerceCar,
  getCommerceCarById,
} = require("../../data/functions/commerceCar.js");
const Users = require("../../data/models/user.js");

const deleteMidCommerceCar = async (req, res, next) => {
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
    // Get the commerce car by ID
    const commerceCar = await getCommerceCarById(id);
    if (!commerceCar) {
      return res.status(404).send("Commerce car not found in DB");
    }

    // Delete the commerce car
    const result = await deleteCommerceCar(id);

    // Check if the deletion was successful
    if (result === 0) {
      return res.status(404).send("Commerce car not found or already deleted");
    }

    res.status(200).send("Commerce car deleted successfully");
    next();
  } catch (error) {
    return res
      .status(400)
      .send("Error from deleteMidCommerceCar: " + error.message);
  }
};

module.exports = { deleteMidCommerceCar };
