import { getAllMotorcycles } from "../../data/functions/motos.js";

export const getMidMotorcycle = async (req, res, next) => {
  try {
    const result = await getAllMotorcycles();
    if (result.length === 0) {
      return res.status(404).json({ message: "Motocyles have not yet!" });
    }
    res.status(200).json(result);
    next();
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error from getMidMotorcycle", error: err.message });
  }
};
