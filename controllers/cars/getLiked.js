const { getCarById } = require("../../data/functions/autombiles");
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
    await car.update({
      liked:
        (car.liked || 0) + parseInt(count) < 0
          ? 0
          : (car.liked || 0) + parseInt(count),
    });

    res.status(200).json(car);
  } catch (e) {
    return res.status(400).send("error of getLiked:\n" + e.message);
  }
};

module.exports = { getLiked };
