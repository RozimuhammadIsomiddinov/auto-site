import { Op } from "sequelize";
import Car from "../../data/models/automobile.js";
import Country from "../../data/models/country.js";

export const filter_cars = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) return res.status(400).json({ message: "Send country name" });

    const page = parseInt(req.query.page) || 1;
    const pageSize = 12;
    const offset = (page - 1) * pageSize;

    const country = await Country.findOne({
      where: { name: { [Op.iLike]: `%${name}%` } },
    });

    // Agar mamlakat topilmasa, shunchaki bosh massiv qaytariladi.
    if (!country) {
      return res.status(200).json([]);
    }

    const countryName = country.name;

    const cars = await Car.findAll({
      where: { country: { [Op.iLike]: `%${countryName}%` } },
      limit: pageSize,
      offset,
    });

    return res.status(200).json(cars);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error from filter_cars", error: e.message });
  }
};
