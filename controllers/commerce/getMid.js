import { getAllCommerceCars } from "../../data/functions/commerceCar.js";

export const getMidCommerceCars = async (req, res) => {
  try {
    const result = await getAllCommerceCars(req.query.page, req.query.pageSize);
    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "No commerce cars available yet!" });
    }
    res.status(200).json(result);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error from getMidCommerceCars", error: err.message });
  }
};
