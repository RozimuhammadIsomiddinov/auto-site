const { QueryTypes } = require("sequelize");
const { getCarById } = require("../../data/functions/autombiles");
const Car = require("../../data/models/automobile.js");
const Users = require("../../data/models/user.js");

const getLiked = async (req, res) => {
  try {
    const { id } = req.params; //car id
    const { user_id } = req.query; //user id
    const { count } = req.query; // 1 or -1

    const user = await Users.findOne({ where: { id: user_id } });
    if (!user)
      return res.status(400).json({
        message: "you have to be registration",
        method: "post",
        path: `http://212.67.11.143:4035/user-register`,
      });

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
        liked:
          (car.liked || 0) + parseInt(count) < 0
            ? 0
            : (car.liked || 0) + parseInt(count),
        liked_user: newLikedUsers,
      });
    } else if (parseInt(count) < 0) {
      const newLikedUsers = likedUsers.filter((email) => email !== user.email);

      await car.update({
        liked:
          (car.liked || 0) + parseInt(count) < 0
            ? 0
            : (car.liked || 0) + parseInt(count),
        liked_user: newLikedUsers,
      });
    }

    res.status(200).json(car);
  } catch (e) {
    return res.status(400).send("error of getLiked:\n" + e.message);
  }
};
const getAllLikedCars = async (req, res) => {
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

module.exports = { getLiked, getAllLikedCars };
