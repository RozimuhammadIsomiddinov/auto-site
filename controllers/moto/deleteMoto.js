import {
  deleteMotorcycle,
  getMotorcycleById,
} from "../../data/functions/motos.js";
import Motorcycle from "../../data/models/moto.js";
import Users from "../../data/models/user.js";

const deleteMidMotorcycle = async (req, res) => {
  try {
    const { id } = req.params;
    const { authoremail } = req.query;

    if (!id) {
      return res.status(400).json({ message: "moto ID is required" });
    }

    const moto = await Motorcycle.findByPk(id);

    if (!moto) {
      return res.status(404).json({ message: "moto not found" });
    }

    if (moto.authoremail !== authoremail) {
      return res.status(400).json({
        message: "This product is not yours",
        method: "post",
      });
    }

    const motorcycle = await getMotorcycleById(id);

    if (!motorcycle) {
      return res.status(404).send("Motorcycle not found in DB");
    }

    await deleteMotorcycle(id);
    res.status(200).send("Motorcycle deleted");
  } catch (er) {
    return res
      .status(400)
      .send("Error from deleteMidMotorcycle: " + er.message);
  }
};

export { deleteMidMotorcycle };
