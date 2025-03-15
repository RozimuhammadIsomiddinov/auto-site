import { getCarById } from "../../data/functions/autombiles.js";
import Mark from "../../data/models/carMark.js";
import Users from "../../data/models/user.js";

export const getMidById = async (req, res) => {
  try {
    const result = await getCarById(req.params.id);
    if (!result) {
      return res
        .status(404)
        .json({ message: `Car with ID: ${req.params.id} not found` });
    }
    if (!result.authoremail) {
      return res
        .status(400)
        .json({ message: "Car does not have an author email." });
    }

    const dataEmail = result.authoremail;
    const findUser = await Users.findOne({ where: { email: dataEmail } });

    if (!findUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    await result.update({ seen: (result.seen || 0) + 1 });

    const mark_name = await Mark.findByPk(result.mark_id);
    result.mark_name = mark_name || null;

    res.status(200).json({ result, userData: findUser });
  } catch (err) {
    if (!res.headersSent) {
      res
        .status(400)
        .json({ message: "Error from getMidById", error: err.message });
    }
  }
};
