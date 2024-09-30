const Mark = require("../../data/models/carMark");
const Car = require("../../data/models/automobile");
const Motorcycle = require("../../data/models/moto");
const CommerceCar = require("../../data/models/commerce");
const getByIdMark = async (req, res, next) => {
  try {
    const { page, pageSize, mark } = req.query;
    const offset = (page - 1) * pageSize;
    let result = {};
    const resultCars = await Car.findAll({
      where: { mark },
      limit: pageSize,
      offset,
    });

    result.resultCars = resultCars;
    const resultMoto = await Motorcycle.findAll({
      where: { mark },
      limit: pageSize,
      offset,
    });
    result.resultMoto = resultMoto;

    const resultCommerce = await CommerceCar.findAll({
      where: { mark },
      limit: pageSize,
      offset,
    });

    result.resultCommerce = resultCommerce;

    res.json({
      vehicles: result,
    });
    next();
  } catch (err) {
    if (!res.headersSent) {
      res.status(400).json({
        message: "Error from getByIdMark",
        error: err.message,
      });
    }
  }
};
module.exports = getByIdMark;
