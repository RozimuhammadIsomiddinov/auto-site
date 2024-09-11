import { getCarById } from "../../data/functions/autombiles.js";

export const getMidById = async (req, res) => {
  try {
    const result = await getCarById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "car has not!" });
    }
    res.status(200).json(result);
  } catch (err) {
    if (!res.headersSent) {
      res
        .status(400)
        .json({ message: "Error from getMidById", error: err.message });
    }
  }
};
