import { Op, where, cast, col } from "sequelize";
import Car from "../../data/models/automobile.js";
import Motorcycle from "../../data/models/moto.js";
import CommerceCar from "../../data/models/commerce.js";
import Mark from "../../data/models/carMark.js";

export const beforeFilter = async (req, res) => {
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

export const modelFilter = async (req, res) => {
  try {
    const { mark_id } = req.body;
    if (!mark_id) {
      return res.status(400).json({ error: "Mark parameter is required." });
    }

    const carResults = await Car.findAll({ where: { mark_id } });
    const motoResults = await Motorcycle.findAll({ where: { mark_id } });
    const commerceResults = await CommerceCar.findAll({ where: { mark_id } });

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
