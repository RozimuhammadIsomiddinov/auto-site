import Mark from "../../data/models/carMark.js";
import dotenv from "dotenv";

dotenv.config();
const baseUrl = process.env.BACKEND_URL;

export const getByIDMark = async (req, res) => {
  try {
    const { id } = req.params;
    const parsedId = parseInt(id);

    const mark = await Mark.findByPk(parsedId);

    res.status(200).json({
      id: mark.id,
      name: mark.mark_name,
      image: mark.image.startsWith("http")
        ? mark.image
        : `${baseUrl}/${mark.image}`,
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error from getByIDMark", error: err.message });
  }
};
