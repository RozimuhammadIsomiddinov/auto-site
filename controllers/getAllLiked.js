const { QueryTypes } = require("sequelize");
const Car = require("../data/models/automobile");
const CommerceCar = require("../data/models/commerce");
const Motorcycle = require("../data/models/moto");

const getAllLiked = async (req, res) => {
  try {
    const { user_email } = req.query;
    if (!user_email) {
      return res.status(400).json({ message: "User email is required!" });
    }

    const cars = await Car.sequelize.query(
      "SELECT * FROM cars WHERE :email = ANY (liked_user)",
      {
        replacements: { email: user_email },
        type: QueryTypes.SELECT,
      }
    );

    const motorcycles = await Motorcycle.sequelize.query(
      "SELECT * FROM motorcycles WHERE :email = ANY (liked_user)",
      {
        replacements: { email: user_email },
        type: QueryTypes.SELECT,
      }
    );

    const commerceCars = await CommerceCar.sequelize.query(
      "SELECT * FROM commerce_cars WHERE :email = ANY (liked_user)",
      {
        replacements: { email: user_email },
        type: QueryTypes.SELECT,
      }
    );

    const likedItems = {
      cars: [...cars],
      moto: [...motorcycles],
      commerce: [...commerceCars],
    };

    if (
      likedItems.cars.length === 0 &&
      likedItems.moto.length === 0 &&
      likedItems.commerce.length === 0
    ) {
      return res.status(200).json([]);
    }

    return res.status(200).json(likedItems);
  } catch (e) {
    return res
      .status(400)
      .json({ message: "Error fetching liked items: " + e.message });
  }
};

module.exports = { getAllLiked };
