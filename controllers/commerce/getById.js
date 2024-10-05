const { getCommerceCarById } = require("../../data/functions/commerceCar.js");

const getMidCommerceCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getCommerceCarById(id);

    if (!result) {
      return res.status(404).json({ message: "Commerce car not found!" });
    }
    await result.update({ seen: (result.seen || 0) + 1 });

    res.status(200).json(result);
  } catch (err) {
    if (!res.headersSent) {
      res.status(400).json({
        message: "Error from getMidCommerceCarById",
        error: err.message,
      });
    }
  }
};

module.exports = { getMidCommerceCarById };
