import { QueryTypes } from "sequelize";
import { getCarById } from "../../data/functions/autombiles.js";
import Car from "../../data/models/automobile.js";
import Users from "../../data/models/user.js";

export const getLiked = async (req, res) => {
  try {
    const { id } = req.params; // car id
    const { user_id, count } = req.query; // user id and count

    const user = await Users.findOne({ where: { id: user_id } });
    if (!user) {
      return res.status(400).json({
        message: "you have to be registration",
        method: "post",
      });
    }

    const car = await getCarById(id);

    if (!car) {
      return res.status(404).json({ message: "Car not found!" });
    }

    const likedUsers = car.liked_user || [];
    if (parseInt(count) > 0) {
      const newLikedUsers = likedUsers.includes(user.email)
        ? likedUsers
        : [...likedUsers, user.email];

      await car.update({
        liked: Math.max((car.liked || 0) + parseInt(count), 0),
        liked_user: newLikedUsers,
      });
    } else if (parseInt(count) < 0) {
      const newLikedUsers = likedUsers.filter((email) => email !== user.email);

      await car.update({
        liked: Math.max((car.liked || 0) + parseInt(count), 0),
        liked_user: newLikedUsers,
      });
    }

    res.status(200).json(car);
  } catch (e) {
    return res.status(400).send("error of getLiked:\n" + e.message);
  }
};

export const getAllLikedCars = async (req, res) => {
  try {
    const { user_email } = req.query;
    const cars = await Car.sequelize.query(
      "SELECT * FROM cars WHERE :email = ANY (liked_user)",
      {
        replacements: { email: user_email },
        type: QueryTypes.SELECT,
      }
    );

    if (cars.length === 0) {
      return res.status(404).json({ message: "No cars liked by this user!" });
    }

    return res.status(200).json(cars);
  } catch (e) {
    return res
      .status(400)
      .json({ message: "Error fetching cars: " + e.message });
  }
};
