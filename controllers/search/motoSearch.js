const Motorcycle = require("../../data/models/moto.js");
const { Op } = require("sequelize");

const searchMoto = async (req, res, next) => {
  let { statement, maxYear, minPrice, maxPrice, page, pageSize } = req.query;
  if (!page || !pageSize) {
    page = 1;
    pageSize = 10;
  }
  let filter = {};
  if (statement) filter.statement = statement;
  if (maxYear) filter.year[Op.lte] = maxYear;
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
    const moto = await Motorcycle.findAll({
      where: filter,
      limit: pageSize,
      offset,
    });
    res.status(200).json(moto);
  } catch (err) {
    res.status(500).json({ error: `Something went wrong:\t${err}` });
  }
};
module.exports = { searchMoto };
