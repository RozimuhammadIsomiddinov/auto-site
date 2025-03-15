import { getVehicle } from "../../data/functions/news.js";

export const getVehicleMid = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 2;

    const result = await getVehicle(page, pageSize);
    if (result.length === 0) {
      return res.status(404).json({ message: "No news of vehicle available!" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      message: "Error from getMidNews",
      error: err.message,
    });
  }
};
