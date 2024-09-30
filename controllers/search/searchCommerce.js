const Commerce = require("../../data/models/commerce");
const { Op } = require("sequelize");

const searchCommerce = async (req, res, next) => {
  let { year, minPrice, maxPrice, page, pageSize } = req.body;
  if (!page || !pageSize) {
    page = 1;
    pageSize = 10;
  }
  let filter = {};
  if (year) filter.year = year;
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

    const commerce = await Commerce.findAll({
      where: filter,
      limit: pageSize,
      offset,
    });
    res.status(200).json(commerce);
  } catch (err) {
    res.status(500).json({ error: `Something went wrong:\t${err}` });
  }
};

module.exports = {
  searchCommerce,
};
