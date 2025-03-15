import { QueryTypes } from "sequelize";
import Car from "../data/models/automobile.js";
import CommerceCar from "../data/models/commerce.js";
import Motorcycle from "../data/models/moto.js";

export const getAllLiked = async (req, res) => {
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
      cars,
      moto: motorcycles,
      commerce: commerceCars,
    };

    if (!cars.length && !motorcycles.length && !commerceCars.length) {
      return res.status(200).json([]);
    }

    return res.status(200).json(likedItems);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Error fetching liked items: " + e.message });
  }
};
