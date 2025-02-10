const { Op } = require("sequelize");
const Car = require("../../data/models/automobile");
const CommerceCar = require("../../data/models/commerce");
const Country = require("../../data/models/country");
const Motorcycle = require("../../data/models/moto");

const filter = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Send country name" });

    const page = parseInt(req.query.page) || 1;
    const pageSize = 4;
    const offset = (page - 1) * pageSize;

    const country = await Country.findOne({
      where: { name: { [Op.iLike]: `%${name}%` } },
    });

    if (!country)
      return res.status(404).json({ message: "This country not found" });

    const cars = await Car.findAll({
      where: { country: { [Op.iLike]: `%${country}%` } },
      limit: pageSize,
      offset,
    });

    const motorcycles = await Motorcycle.findAll({
      where: { country: { [Op.iLike]: `%${country}%` } },
      limit: pageSize,
      offset,
    });

    const commerceCars = await CommerceCar.findAll({
      where: { country: { [Op.iLike]: `%${country}%` } },
      limit: pageSize,
      offset,
    });

    return res.status(200).json({
      cars,
      motorcycles,
      commerceCars,
    });
  } catch (e) {
    res.status(500).json({ message: "Error from filter", error: e.message });
  }
};

module.exports = filter;
