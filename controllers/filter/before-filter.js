const { Op, where, cast, col } = require("sequelize");
const Car = require("../../data/models/automobile");
const Motorcycle = require("../../data/models/moto");
const CommerceCar = require("../../data/models/commerce");

const beforeFilter = async (req, res) => {
  try {
    const marks = await Car.findAll();
    const markMoto = await Motorcycle.findAll();
    const commerce = await CommerceCar.findAll();

    const carMarks = new Set(marks.map((mark) => mark.dataValues.mark));
    const motoMarks = new Set(markMoto.map((mark) => mark.dataValues.mark));
    const commerceMarks = new Set(commerce.map((mark) => mark.dataValues.mark));

    res.json({
      car: Array.from(carMarks),
      moto: Array.from(motoMarks),
      commerce: Array.from(commerceMarks),
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: `Something went wrong on beforeFilter: ${err.message}` });
  }
};

const modelFilter = async (req, res) => {
  try {
    const { mark } = req.query;
    if (!mark) {
      return res.status(400).json({ error: "Mark parameter is required." });
    }

    const carResults = await Car.findAll({
      where: where(cast(col("mark"), "TEXT"), {
        [Op.iLike]: `%${mark}%`,
      }),
    });
    const motoResults = await Motorcycle.findAll({
      where: where(cast(col("mark"), "TEXT"), {
        [Op.iLike]: `%${mark}%`,
      }),
    });
    const commerceResults = await CommerceCar.findAll({
      where: where(cast(col("mark"), "TEXT"), {
        [Op.iLike]: `%${mark}%`,
      }),
    });

    const carMarks = Array.from(
      new Set(
        carResults.map(
          (car) =>
            car.dataValues.model ||
            car.dataValues.country ||
            car.dataValues.cost
        )
      )
    );
    const motoMarks = Array.from(
      new Set(
        motoResults.map(
          (moto) =>
            moto.dataValues.model ||
            moto.dataValues.country ||
            moto.dataValues.cost
        )
      )
    );
    const commerceMarks = Array.from(
      new Set(
        commerceResults.map(
          (commerce) =>
            commerce.dataValues.model ||
            commerce.dataValues.country ||
            commerce.dataValues.cost
        )
      )
    );
    const results = {
      cars: carMarks,
      motorcycles: motoMarks,
      commerceCars: commerceMarks,
    };

    res.json(results);
  } catch (err) {
    res
      .status(500)
      .json({ error: `Something went wrong on modelFilter: ${err.message}` });
  }
};

module.exports = { modelFilter, beforeFilter };
