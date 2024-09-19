const { getAllCommerceCars } = require("../../data/functions/commerceCar.js");

const getMidCommerceCars = async (req, res, next) => {
  try {
    const result = await getAllCommerceCars();
    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "No commerce cars available yet!" });
    }
    res.status(200).json(result);
    next();
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error from getMidCommerceCars", error: err.message });
  }
};

module.exports = { getMidCommerceCars };
