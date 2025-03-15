import { getMotorcycleById } from "../../data/functions/motos.js";
import Users from "../../data/models/user.js";

const getLikedMoto = async (req, res) => {
  try {
    const { id } = req.params; // moto id
    const { user_id, count } = req.query; // user id va like qo'shish yoki olib tashlash

    const user = await Users.findOne({ where: { id: user_id } });
    if (!user) {
      return res.status(400).json({
        message: "You have to be registered",
        method: "post",
      });
    }

    const moto = await getMotorcycleById(id);
    if (!moto) {
      return res.status(404).json({ message: "Moto not found!" });
    }

    const likedUsers = moto.liked_user || [];
    const parsedCount = parseInt(count);

    if (parsedCount > 0) {
      const newLikedUsers = likedUsers.includes(user.email)
        ? likedUsers
        : [...likedUsers, user.email];

      await moto.update({
        liked: Math.max((moto.liked || 0) + parsedCount, 0),
        liked_user: newLikedUsers,
      });
    } else if (parsedCount < 0) {
      const newLikedUsers = likedUsers.filter((email) => email !== user.email);

      await moto.update({
        liked: Math.max((moto.liked || 0) + parsedCount, 0),
        liked_user: newLikedUsers,
      });
    }

    res.status(200).json(moto);
  } catch (e) {
    return res.status(400).send("Error of getLikedMoto:\n" + e.message);
  }
};

export { getLikedMoto };
