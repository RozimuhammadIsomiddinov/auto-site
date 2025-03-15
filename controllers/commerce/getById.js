import { getCommerceCarById } from "../../data/functions/commerceCar.js";
import Users from "../../data/models/user.js";

export const getMidCommerceCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getCommerceCarById(id);

    if (!result) {
      return res.status(404).json({ message: "Commerce car not found!" });
    }

    const dataEmail = result.dataValues.authoremail;
    const findUser = await Users.findOne({ where: { email: dataEmail } });

    await result.update({ seen: (result.seen || 0) + 1 });

    res.status(200).json({ result, userData: findUser });
  } catch (err) {
    if (!res.headersSent) {
      res.status(400).json({
        message: "Error from getMidCommerceCarById",
        error: err.message,
      });
    }
  }
};
