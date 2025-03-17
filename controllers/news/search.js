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
        include: [
          {
            model: Mark,
            as: "mark",
            where: {
              [Op.or]: [
                { "$mark.mark_name$": { [Op.iLike]: `%${q}%` } },
                { model: { [Op.iLike]: `%${q}%` } },
              ],
            },
          },
        ],
      }),
      Motorcycle.findAll({
        include: [
          {
            model: Mark,
            as: "mark",
            where: {
              [Op.or]: [
                { "$mark.mark_name$": { [Op.iLike]: `%${q}%` } },
                { model: { [Op.iLike]: `%${q}%` } },
              ],
            },
          },
        ],
      }),
      CommerceCar.findAll({
        include: [
          {
            model: Mark,
            as: "mark",
            where: {
              [Op.or]: [
                { "$mark.mark_name$": { [Op.iLike]: `%${q}%` } },
                { model: { [Op.iLike]: `%${q}%` } },
              ],
            },
          },
        ],
      }),
    ]);

    return res.status(200).json({ cars, moto, commerce });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server xatosi", e: error.message });
  }
};
