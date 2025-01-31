const CommerceCar = require("../../data/models/commerce");
const Commerce = require("../../data/models/commerce");
const { Op } = require("sequelize");

const searchCommerce = async (req, res) => {
  let {
    model,
    country,
    rate,
    maxYear,
    minPrice,
    maxPrice,
    page = 1,
    pageSize = 10,
  } = req.body;

  let filter = {};

  if (rate) {
    filter.rate = rate;
    return await getFilteredCommerce(filter, pageSize, page, res);
  }

  if (maxYear) {
    filter.year = { [Op.lte]: Number(maxYear) };
    return await getFilteredCommerce(filter, pageSize, page, res);
  }

  if (country) {
    filter.country = country;
    return await getFilteredCommerce(filter, pageSize, page, res);
  }

  if (model) {
    filter.model = model;
    return await getFilteredCommerce(filter, pageSize, page, res);
  }

  if (minPrice || maxPrice) {
    filter.cost = {};
    if (minPrice) filter.cost[Op.gte] = Number(minPrice);
    if (maxPrice) filter.cost[Op.lte] = Number(maxPrice);
    return await getFilteredCommerce(filter, pageSize, page, res);
  }

  res.status(400).json({ error: "At least one filter condition is required." });
};

const getFilteredCommerce = async (filter, pageSize = 10, page, res) => {
  try {
    const offset = (page - 1) * pageSize;
    const totalCount = await CommerceCar.count({ where: filter });

    const commerce = await CommerceCar.findAll({
      where: filter,
      limit: pageSize,
      offset,
    });

    res.status(200).json({ commerce, count: totalCount });
  } catch (err) {
    res.status(500).json({
      error: `Something went wrong in getFilteredCommerce:\t${err.message}`,
    });
  }
};

module.exports = { searchCommerce };
