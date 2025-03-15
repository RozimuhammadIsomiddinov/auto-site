import { deleteCommerceCar } from "../../data/functions/commerceCar.js";
import CommerceCar from "../../data/models/commerce.js";

export const deleteMidCommerceCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { authoremail } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Car ID is required" });
    }

    const commerce = await CommerceCar.findByPk(id);
    if (!commerce) {
      return res.status(404).json({ message: "Car not found" });
    }

    if (commerce.authoremail !== authoremail) {
      return res.status(400).json({
        message: "This product is not yours",
        method: "post",
      });
    }

    await deleteCommerceCar(id);

    res.status(200).send("Commerce car deleted successfully");
  } catch (error) {
    return res
      .status(400)
      .send("Error from deleteMidCommerceCar: " + error.message);
  }
};
