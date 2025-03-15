import {
  updateMotorcycle,
  getMotorcycleById,
} from "../../data/functions/motos.js";

const updateMotorcycleMid = async (req, res) => {
  try {
    const { id } = req.params;
    const { authoremail } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Motorcycle ID is required" });
    }

    const existingMotorcycle = await getMotorcycleById(id);

    if (!existingMotorcycle) {
      return res.status(404).json({ message: "Motorcycle not found" });
    }

    if (existingMotorcycle.authoremail !== authoremail) {
      return res.status(400).json({
        message: "This product is not yours",
        method: "post",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).send("You have to upload at least 1 picture");
    }

    const result = await updateMotorcycle(req);

    if (result.error) {
      return res.status(400).json({ message: result.error });
    }

    res
      .status(200)
      .json({ message: "Motorcycle successfully updated", data: result });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Error from updateMotorcycleMid", error: err.message });
  }
};

export { updateMotorcycleMid };
