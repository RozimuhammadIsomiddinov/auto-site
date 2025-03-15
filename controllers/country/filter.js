import { Op } from "sequelize";
import Car from "../../data/models/automobile.js";
import CommerceCar from "../../data/models/commerce.js";
import Country from "../../data/models/country.js";
import Motorcycle from "../../data/models/moto.js";

export const filter = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Send country name" });

    const page = parseInt(req.query.page) || 1;
    const pageSize = 4;
    const offset = (page - 1) * pageSize;

    const country = await Country.findOne({
      where: { name: { [Op.iLike]: `%${name}%` } },
    });

    // Agar mamlakat topilmasa, bo‘sh massiv qaytaramiz.
    if (!country) {
      return res
        .status(200)
        .json({ cars: [], motorcycles: [], commerceCars: [] });
    }

    const countryName = country.name;

    const cars = await Car.findAll({
      where: { country: { [Op.iLike]: `%${countryName}%` } },
      limit: pageSize,
      offset,
    });

    const motorcycles = await Motorcycle.findAll({
      where: { country: { [Op.iLike]: `%${countryName}%` } },
      limit: pageSize,
      offset,
    });

    const commerceCars = await CommerceCar.findAll({
      where: { country: { [Op.iLike]: `%${countryName}%` } },
      limit: pageSize,
      offset,
    });

    return res.status(200).json({
      cars,
      motorcycles,
      commerceCars,
    });
  } catch (e) {
    res.status(500).json({ message: "Error from filter", error: e.message });
  }
};
