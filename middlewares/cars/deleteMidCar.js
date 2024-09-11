import { deleteCar, getCarById } from "../../data/functions/autombiles.js";

export const deleteMidCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await getCarById(id);
    if (!car) {
      return res.status(404).send("car not found in DB");
    }
    const result = await deleteCar(id); //returns array
    res
      .status(200)
      .send(result.rowCount > 0 ? "Product deleted" : "No product found");
    next();
  } catch (er) {
    return res.status(400).send("Error from deleteMidCar: " + er.message);
  }
};
