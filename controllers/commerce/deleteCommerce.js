const {
  deleteCommerceCar,
  getCommerceCarById,
} = require("../../data/functions/commerceCar.js");

const deleteMidCommerceCar = async (req, res, next) => {
  try {
    const { id } = req.params;

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
