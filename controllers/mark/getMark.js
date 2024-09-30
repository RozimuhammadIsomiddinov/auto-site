const Mark = require("../../data/models/carMark");

const getAllMark = async (req, res, next) => {
  try {
    const { page, pageSize } = req.query;
    const offset = (page - 1) * pageSize;
    const result = await Mark.findAll({
      limit: pageSize,
      offset,
    });
    if (!result.length) {
      return res.status(404).json({ message: "No marks available yet!" });
    }
    res.status(200).json(result);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error from getAllMark", error: err.message });
  }
};
module.exports = getAllMark;
