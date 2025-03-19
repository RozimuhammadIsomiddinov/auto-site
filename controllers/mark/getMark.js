import Mark from "../../data/models/carMark.js";
import dotenv from "dotenv";

dotenv.config();
const baseUrl = process.env.BACKEND_URL;

const getAllMark = async (req, res) => {
  try {
    const result = await Mark.findAll();

    const updatedResult = result.map((mark) => {
      return {
        id: mark.id,
        name: mark.mark_name,
        image: mark.image.startsWith("http")
          ? mark.image
          : `${baseUrl}/${mark.image}`,
      };
    });

    res.status(200).json(updatedResult);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error from getAllMark", error: err.message });
  }
};

export default getAllMark;
