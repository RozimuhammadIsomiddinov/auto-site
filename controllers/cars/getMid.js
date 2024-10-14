const { getAllCars } = require("../../data/functions/autombiles.js");

const getMid = async (req, res, next) => {
  try {
    const result = await getAllCars(req.query.page, req.query.pageSize);
    if (result.length == 0) {
      return res.status(404).json({ message: "cars have not yet!" });
    }
    res.status(200).json(result);
    next();
  } catch (err) {
    res.status(400).json({ message: "Error from getMid", error: err.message });
  }
};

module.exports = { getMid };
