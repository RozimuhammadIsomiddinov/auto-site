const { getCarById } = require("../../data/functions/autombiles.js");

const getMidById = async (req, res) => {
  try {
    const result = await getCarById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "car has not!" });
    }
    await result.update({ seen: (result.seen || 0) + 1 });

    res.status(200).json(result);
  } catch (err) {
    if (!res.headersSent) {
      res
        .status(400)
        .json({ message: "Error from getMidById", error: err.message });
    }
  }
};

module.exports = { getMidById };
