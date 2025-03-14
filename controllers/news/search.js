const { Op } = require("sequelize");
const Car = require("../../data/models/automobile");
const Motorcycle = require("../../data/models/moto");
const CommerceCar = require("../../data/models/commerce");
const Mark = require("../../data/models/carMark");

const searchCont = async (req, res) => {
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
                { mark_name: { [Op.iLike]: `%${q}%` } }, // Marka nomi boyicha qidirish
                { model: { [Op.iLike]: `%${q}%` } }, // Model boyicha qidirish
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
                { mark_name: { [Op.iLike]: `%${q}%` } }, // Marka nomi boyicha qidirish
                { model: { [Op.iLike]: `%${q}%` } }, // Model boyicha qidirish
              ],
            }, // Markani qidirish
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
                { mark_name: { [Op.iLike]: `%${q}%` } }, // Marka nomi boyicha qidirish
                { model: { [Op.iLike]: `%${q}%` } }, // Model boyicha qidirish
              ],
            }, // Markani qidirish
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

module.exports = { searchCont };
