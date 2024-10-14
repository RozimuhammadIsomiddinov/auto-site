const { Op } = require("sequelize");
const Car = require("../../data/models/automobile");
const CommerceCar = require("../../data/models/commerce");
const Motorcycle = require("../../data/models/moto");

const allFilter = async (req, res) => {
  let { rate, statement, maxYear, minPrice, maxPrice, page, pageSize } =
    req.query;
  if (!page || !pageSize) {
    page = 1;
    pageSize = 10;
  }
  let filter = {};
  if (statement) filter.statement = statement;
  if (rate) filter.rate = rate;
  if (maxYear) filter.year = { [Op.lte]: maxYear };

  if (minPrice || maxPrice) {
    filter.cost = {};
    if (minPrice) {
      filter.cost[Op.gte] = minPrice;
    }
    if (maxPrice) {
      filter.cost[Op.lte] = maxPrice;
    }
  }
  try {
    const offset = (page - 1) * pageSize;

    let counter =
      (await Car.findAll({ where: filter })).length +
      (await CommerceCar.findAll({ where: filter })).length +
      (await Motorcycle.findAll({ where: filter })).length;
    console.log("xa");

    const cars = await Car.findAll({ where: filter, limit: pageSize, offset });
    const commerce = await CommerceCar.findAll({
      where: filter,
      limit: pageSize,
      offset,
    });
    const moto = await Motorcycle.findAll({
      where: filter,
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
