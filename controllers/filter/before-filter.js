const { Op, where, cast, col } = require("sequelize");
const Car = require("../../data/models/automobile");
const Motorcycle = require("../../data/models/moto");
const CommerceCar = require("../../data/models/commerce");
const Mark = require("../../data/models/carMark");

const beforeFilter = async (req, res) => {
  try {
    const result = await Mark.findAll();
    const result1 = result.map((item) => ({
      id: item.id,
      mark: item.mark_name,
    }));

    res.status(200).json(result1);
  } catch (err) {
    res
      .status(500)
      .json({ error: `Something went wrong on beforeFilter: ${err.message}` });
  }
};

const modelFilter = async (req, res) => {
  try {
    const { mark_id } = req.query;
    if (!mark_id) {
      return res.status(400).json({ error: "Mark parameter is required." });
    }

    const carResults = await Car.findAll({
      where: { mark_id },
    });
    const motoResults = await Motorcycle.findAll({
      where: { mark_id },
    });
    const commerceResults = await CommerceCar.findAll({
      where: { mark_id },
    });
    const carMarks = Array.from(
      new Set(carResults.map((car) => car.dataValues.model))
    );
    const carCountries = Array.from(
      new Set(carResults.map((car) => car.dataValues.country))
    );

    const motoMarks = Array.from(
      new Set(motoResults.map((moto) => moto.dataValues.model))
    );
    const motoCountries = Array.from(
      new Set(motoResults.map((moto) => moto.dataValues.country))
    );

    const commerceMarks = Array.from(
      new Set(commerceResults.map((commerce) => commerce.dataValues.model))
    );
    const commerceCountries = Array.from(
      new Set(commerceResults.map((commerce) => commerce.dataValues.country))
    );

    const results = {
      cars: {
        models: carMarks,
        countries: carCountries,
      },
      motorcycles: {
        models: motoMarks,
        countries: motoCountries,
      },
      commerceCars: {
        models: commerceMarks,
        countries: commerceCountries,
      },
    };

    res.status(200).json(results);
  } catch (err) {
    res
      .status(500)
      .json({ error: `Something went wrong on modelFilter: ${err.message}` });
  }
};

module.exports = { modelFilter, beforeFilter };
