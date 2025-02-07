const { getAllMotorcycles } = require("../../data/functions/motos.js");

const getMidMotorcycle = async (req, res) => {
  try {
    const result = await getAllMotorcycles(req.query.page, req.query.pageSize);
    if (result.length === 0) {
      return res.status(404).json({ message: "Motocyles have not yet!" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      message: "Error from getMidMotorcycle",
      error: err.message,
    });
  }
};

module.exports = { getMidMotorcycle };
