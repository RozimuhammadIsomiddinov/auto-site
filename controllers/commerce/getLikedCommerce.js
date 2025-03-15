import { getCommerceCarById } from "../../data/functions/commerceCar.js";
import Users from "../../data/models/user.js";

export const getLikedCommerce = async (req, res) => {
  try {
    const { id } = req.params; // commerce car id
    const { user_id, count } = req.query; // user id va count (1 yoki -1)

    const user = await Users.findOne({ where: { id: user_id } });
    if (!user) {
      return res.status(400).json({
        message: "You have to be registered",
        method: "post",
      });
    }

    const commerce = await getCommerceCarById(id);
    if (!commerce) {
      return res.status(404).json({ message: "Commerce car not found!" });
    }

    const likedUsers = commerce.liked_user || [];

    if (parseInt(count) > 0) {
      const newLikedUsers = likedUsers.includes(user.email)
        ? likedUsers
        : [...likedUsers, user.email];
      await commerce.update({
        liked:
          (commerce.liked || 0) + parseInt(count) < 0
            ? 0
            : (commerce.liked || 0) + parseInt(count),
        liked_user: newLikedUsers,
      });
    } else if (parseInt(count) < 0) {
      const newLikedUsers = likedUsers.filter((email) => email !== user.email);

      await commerce.update({
        liked:
          (commerce.liked || 0) + parseInt(count) < 0
            ? 0
            : (commerce.liked || 0) + parseInt(count),
        liked_user: newLikedUsers,
      });
    }

    res.status(200).json(commerce);
  } catch (e) {
    return res.status(400).send("Error of getLikedCommerce:\n" + e.message);
  }
};
