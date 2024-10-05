const { getMotorcycleById } = require("../../data/functions/motos");
const Users = require("../../data/models/user");

const getLikedMoto = async (req, res) => {
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

    const moto = await getMotorcycleById(id);
    if (!moto) {
      return res.status(404).json({ message: "moto not found!" });
    }
    await moto.update({
      liked:
        (moto.liked || 0) + parseInt(count) < 0
          ? 0
          : (moto.liked || 0) + parseInt(count),
    });
    res.status(200).json(moto);
  } catch (e) {
    return res.status(400).send("error of getLikedMoto:\n" + e.message);
  }
};

module.exports = { getLikedMoto };
