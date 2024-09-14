import { getMotorcycleById } from "../../data/functions/motos.js";

export const getMidMotorcycleById = async (req, res) => {
  try {
    const result = await getMotorcycleById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Motorcycle not found!" });
    }
    res.status(200).json(result);
  } catch (err) {
    if (!res.headersSent) {
      res
        .status(400)
        .json({
          message: "Error from getMidMotorcycleById",
          error: err.message,
        });
    }
  }
};
