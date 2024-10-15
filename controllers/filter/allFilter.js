const { Op } = require("sequelize");
const Car = require("../../data/models/automobile");
const CommerceCar = require("../../data/models/commerce");
const Motorcycle = require("../../data/models/moto");

const allFilter = async (req, res) => {
  let {
    rate,
    statement,
    maxYear,
    minPrice,
    maxPrice,
    page = 1,
    pageSize = 10,
  } = req.query;

  let filter = {};
  if (rate) filter.rate = rate;
  if (maxYear) filter.year = { [Op.lte]: maxYear };

  if (minPrice || maxPrice) {
    filter.cost = {};
    if (minPrice) filter.cost[Op.gte] = minPrice;
    if (maxPrice) filter.cost[Op.lte] = maxPrice;
  }

  try {
    const offset = (page - 1) * pageSize;

    if (statement) filter.statement = statement;

    let motoFilter = { ...filter };
    delete motoFilter.statement;
    if (statement) motoFilter.condition = statement;

    const carCount = await Car.count({ where: filter });
    const commerceCount = await CommerceCar.count({ where: filter });
    const motoCount = await Motorcycle.count({ where: motoFilter });
    const counter = carCount + commerceCount + motoCount;

    const cars = await Car.findAll({ where: filter, limit: pageSize, offset });
    const commerce = await CommerceCar.findAll({
      where: filter,
      limit: pageSize,
      offset,
    });
    const moto = await Motorcycle.findAll({
      where: motoFilter,
      limit: pageSize,
      offset,
    });

    res.status(200).json({ cars, commerce, moto, count: counter });
  } catch (err) {
    res
      .status(500)
      .json({ error: `Something went wrong on allFilter:\t${err}` });
  }
};

module.exports = allFilter;
