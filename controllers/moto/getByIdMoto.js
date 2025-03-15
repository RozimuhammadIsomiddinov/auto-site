import { getMotorcycleById } from "../../data/functions/motos.js";
import Users from "../../data/models/user.js";

const getMidMotorcycleById = async (req, res) => {
  try {
    const result = await getMotorcycleById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Motorcycle not found!" });
    }

    const dataEmail = result.dataValues.authoremail;
    const findUser = await Users.findOne({ where: { email: dataEmail } });

    await result.update({ seen: (result.seen || 0) + 1 });

    res.status(200).json({ result, userData: findUser });
  } catch (err) {
    if (!res.headersSent) {
      res.status(400).json({
        message: "Error from getMidMotorcycleById",
        error: err.message,
      });
    }
  }
};

export { getMidMotorcycleById };
