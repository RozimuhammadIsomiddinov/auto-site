import {
  deleteMotorcycle,
  getMotorcycleById,
} from "../../data/functions/motos.js";

export const deleteMidMotorcycle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const motorcycle = await getMotorcycleById(id);

    if (!motorcycle) {
      return res.status(404).send("Motorcycle not found in DB");
    }

    const result = await deleteMotorcycle(id);
    res.status(200).send("Motorcycle deleted");
    next();
  } catch (er) {
    return res
      .status(400)
      .send("Error from deleteMidMotorcycle: " + er.message);
  }
};
