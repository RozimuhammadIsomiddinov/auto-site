import Mark from "../../data/models/carMark.js";
import dotenv from "dotenv";

dotenv.config();
const baseUrl = process.env.BACKEND_URL;

const getAllMark = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    const result = await Mark.findAll({ limit: pageSize, offset });

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
