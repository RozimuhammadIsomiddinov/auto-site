const { Op } = require("sequelize");
const Car = require("../../data/models/automobile");
const Motorcycle = require("../../data/models/moto");
const CommerceCar = require("../../data/models/commerce");

const searchCont = async (req, res) => {
  try {
    const { q } = req.params;

    const [cars, moto, commerce] = await Promise.all([
      Car.findAll({ where: { model: { [Op.iLike]: `%${q}%` } } }),
      Motorcycle.findAll({ where: { model: { [Op.iLike]: `%${q}%` } } }),
      CommerceCar.findAll({ where: { model: { [Op.iLike]: `%${q}%` } } }),
    ]);

    return res.status(200).json({ cars, moto, commerce });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server xatosi", e: error.message });
  }
};

module.exports = { searchCont };
