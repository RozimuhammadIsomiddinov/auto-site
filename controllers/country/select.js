import Country from "../../data/models/country.js";
import dotenv from "dotenv";
dotenv.config();
const baseUrl = process.env.BACKEND_URL;
export const getAllCountry = async (req, res) => {
  try {
    const result = await Country.findAll();

    const updatedResult = result.map((country) => {
      const { id, name, image, description } = country.dataValues;

      return {
        id,
        name,
        description,
        image: image.startsWith("http") ? image : baseUrl + "/" + image,
      };
    });

    res.status(200).json(updatedResult);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error from getAllCountry", error: e.message });
  }
};
