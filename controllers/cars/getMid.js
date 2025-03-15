import { getAllCars } from "../../data/functions/autombiles.js";

export const getMid = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const result = await getAllCars(Number(page), Number(pageSize));

    if (!result || result.length === 0) {
      return res.status(404).json({ message: "No cars available yet!" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Error in getMid:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};
