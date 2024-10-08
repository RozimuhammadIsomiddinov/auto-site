const Commerce = require("../../data/models/commerce");
const { Op } = require("sequelize");

const searchCommerce = async (req, res, next) => {
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

    const commerceCar = await Commerce.findAll({
      where: filter,
      limit: pageSize,
      offset,
    });
    const commerce = await Commerce.findAll({
      where: filter,
    });
    res.status(200).json({ commerceCar, count: commerce.length });
  } catch (err) {
    res.status(500).json({ error: `Something went wrong:\t${err}` });
  }
};

module.exports = {
  searchCommerce,
};
