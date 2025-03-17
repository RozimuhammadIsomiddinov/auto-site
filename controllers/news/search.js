import { Op } from "sequelize";
import Car from "../../data/models/automobile.js";
import Motorcycle from "../../data/models/moto.js";
import CommerceCar from "../../data/models/commerce.js";
import Mark from "../../data/models/carMark.js";

export const searchCont = async (req, res) => {
  try {
    const { q } = req.params;

    const [cars, moto, commerce] = await Promise.all([
      Car.findAll({
        where: {
          [Op.or]: [{ model: { [Op.iLike]: `%${q}%` } }],
        },
        include: [
          {
            model: Mark,
            as: "mark",
            required: false, // Mark bilan boglanmagan mashinalar ham chiqadi
            where: {
              mark_name: { [Op.iLike]: `%${q}%` },
            },
          },
        ],
      }),
      Motorcycle.findAll({
        where: {
          [Op.or]: [{ model: { [Op.iLike]: `%${q}%` } }],
        },
        include: [
          {
            model: Mark,
            as: "mark",
            required: false,
            where: {
              mark_name: { [Op.iLike]: `%${q}%` },
            },
          },
        ],
      }),
      CommerceCar.findAll({
        where: {
          [Op.or]: [{ model: { [Op.iLike]: `%${q}%` } }],
        },
        include: [
          {
            model: Mark,
            as: "mark",
            required: false,
            where: {
              mark_name: { [Op.iLike]: `%${q}%` },
            },
          },
        ],
      }),
    ]);

    return res.status(200).json({ cars, moto, commerce });
  } catch (error) {
    return res.status(500).json({ error: "Server xatosi", e: error.message });
  }
};
