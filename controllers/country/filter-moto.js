import { Op } from "sequelize";
import Country from "../../data/models/country.js";
import Motorcycle from "../../data/models/moto.js";

export const filter_moto = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) return res.status(400).json({ message: "Send country name" });

    const page = parseInt(req.query.page) || 1;
    const pageSize = 12;
    const offset = (page - 1) * pageSize;

    const country = await Country.findOne({
      where: { name: { [Op.iLike]: `%${name}%` } },
    });

    // Agar mamlakat topilmasa, bo‘sh massiv qaytaramiz.
    if (!country) {
      return res.status(200).json([]);
    }

    const countryName = country.name;

    const motorcycles = await Motorcycle.findAll({
      where: { country: { [Op.iLike]: `%${countryName}%` } },
      limit: pageSize,
      offset,
    });

    return res.status(200).json(motorcycles);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error from filter_moto", error: e.message });
  }
};
