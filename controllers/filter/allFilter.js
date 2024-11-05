const { Op } = require("sequelize");
const Car = require("../../data/models/automobile");
const CommerceCar = require("../../data/models/commerce");
const Motorcycle = require("../../data/models/moto");

const allFilter = async (req, res) => {
  let {
    model,
    country,
    rate,
    statement,
    maxYear,
    minPrice,
    maxPrice,
    page = 1,
    pageSize = 10,
  } = req.body;
  let filter = {};

  if (rate) {
    filter.rate = rate;
    return await getFilteredData(filter, pageSize, page, res);
  }

  if (maxYear) {
    filter.year = { [Op.lte]: Number(maxYear) };
    return await getFilteredData(filter, pageSize, page, res);
  }
  if (country) {
    filter.country = country;
    return await getFilteredData(filter, pageSize, page, res);
  }

  if (model) {
    filter.model = model;
    return await getFilteredData(filter, pageSize, page, res);
  }

  if (minPrice || maxPrice) {
    filter.cost = {};
    if (minPrice) filter.cost[Op.gte] = Number(minPrice);
    if (maxPrice) filter.cost[Op.lte] = Number(maxPrice);
    return await getFilteredData(filter, pageSize, page, res);
  }

  if (statement) {
    filter.statement = statement;
    let motoFilter = { ...filter };
    delete motoFilter.statement;
    motoFilter.condition = statement;
    return await getFilteredData(filter, pageSize, page, res, motoFilter);
  }

  res.status(400).json({ error: "At least one filter condition is required." });
};

const getFilteredData = async (
  filter,
  pageSize,
  page,
  res,
  motoFilter = filter
) => {
  try {
    const offset = (page - 1) * pageSize;
    const carCount = await Car.count({ where: filter });
    const commerceCount = await CommerceCar.count({ where: filter });
    const motoCount = await Motorcycle.count({ where: motoFilter });
    const totalCount = carCount + motoCount + commerceCount;

    const cars = await Car.findAll({ where: filter, limit: pageSize, offset });
    const commerce = await CommerceCar.findAll({
      where: filter,
      limit: pageSize,
      offset,
    });
    const motorcycles = await Motorcycle.findAll({
      where: motoFilter,
      limit: pageSize,
      offset,
    });

    res.status(200).json({ cars, motorcycles, commerce, count: totalCount });
  } catch (err) {
    res.status(500).json({
      error: `Something went wrong on getFilteredData:\t${err.message}`,
    });
  }
};

module.exports = allFilter;
