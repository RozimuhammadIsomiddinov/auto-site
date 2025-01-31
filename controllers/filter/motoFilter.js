const { Op } = require("sequelize");
const Motorcycle = require("../../data/models/moto");

const searchMoto = async (req, res) => {
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
    return await getFilteredMotorcycles(filter, pageSize, page, res);
  }

  if (maxYear) {
    filter.year = { [Op.lte]: Number(maxYear) };
    return await getFilteredMotorcycles(filter, pageSize, page, res);
  }

  if (country) {
    filter.country = country;
    return await getFilteredMotorcycles(filter, pageSize, page, res);
  }

  if (model) {
    filter.model = model;
    return await getFilteredMotorcycles(filter, pageSize, page, res);
  }

  if (minPrice || maxPrice) {
    filter.cost = {};
    if (minPrice) filter.cost[Op.gte] = Number(minPrice);
    if (maxPrice) filter.cost[Op.lte] = Number(maxPrice);
    return await getFilteredMotorcycles(filter, pageSize, page, res);
  }

  res.status(400).json({ error: "At least one filter condition is required." });
};

const getFilteredMotorcycles = async (filter, pageSize = 10, page, res) => {
  try {
    const offset = (page - 1) * pageSize;
    const totalCount = await Motorcycle.count({ where: filter });

    const motorcycles = await Motorcycle.findAll({
      where: filter,
      limit: pageSize,
      offset,
    });

    res.status(200).json({ motorcycles, count: totalCount });
  } catch (err) {
    res.status(500).json({
      error: `Something went wrong in getFilteredMotorcycles:\t${err.message}`,
    });
  }
};

module.exports = { searchMoto };
