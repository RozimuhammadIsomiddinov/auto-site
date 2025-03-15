import { updateCar } from "../../data/functions/autombiles.js";
import Car from "../../data/models/automobile.js";

export const updateCarMid = async (req, res) => {
  try {
    const { id } = req.params;
    const { authoremail } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Car ID is required" });
    }

    const car = await Car.findByPk(id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    if (car.authoremail !== authoremail) {
      return res.status(400).json({
        message: "This product is not yours",
        method: "post",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).send("You have to upload at least 1 picture");
    }

    const result = await updateCar(req);

    if (result.error) {
      return res.status(404).json({ message: result.error });
    }

    return res
      .status(200)
      .json({ message: "Car successfully updated", data: result });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Error from updateMidCar", error: err.message });
  }
};
