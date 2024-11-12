const { getMotorcycleById } = require("../../data/functions/motos");
const Users = require("../../data/models/user");

const getLikedMoto = async (req, res) => {
  try {
    const { id } = req.params; // moto id
    const { user_id } = req.query; // user id
    const { count } = req.query; // 1 or -1 (like qo'shish yoki olib tashlash)

    const user = await Users.findOne({ where: { id: user_id } });
    if (!user)
      return res.status(400).json({
        message: "You have to be registered",
        method: "post",
        path: `http://212.67.11.143:4035/user-register`,
      });

    const moto = await getMotorcycleById(id);
    if (!moto) {
      return res.status(404).json({ message: "Moto not found!" });
    }

    const likedUsers = moto.liked_user || [];

    if (parseInt(count) > 0) {
      const newLikedUsers = likedUsers.includes(user.email)
        ? likedUsers
        : [...likedUsers, user.email];
      await moto.update({
        liked:
          (moto.liked || 0) + parseInt(count) < 0
            ? 0
            : (moto.liked || 0) + parseInt(count),
        liked_user: newLikedUsers,
      });
    } else if (parseInt(count) < 0) {
      const newLikedUsers = likedUsers.filter((email) => email !== user.email);

      await moto.update({
        liked:
          (moto.liked || 0) + parseInt(count) < 0
            ? 0
            : (moto.liked || 0) + parseInt(count),
        liked_user: newLikedUsers,
      });
    }

    res.status(200).json(moto);
  } catch (e) {
    return res.status(400).send("Error of getLikedMoto:\n" + e.message);
  }
};

module.exports = { getLikedMoto };
