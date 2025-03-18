import Country from "../../data/models/country.js";

const baseUrl = "https://api.youcarrf.ru/public/images/";

export const getAllCountry = async (req, res) => {
  try {
    const result = await Country.findAll();

    const updatedResult = result.map((country) => {
      const { id, name, image, description } = country.dataValues; // dataValues ichidan ma'lumotni ajratib oldik

      return {
        id,
        name,
        description,
        image: image.startsWith("http") ? image : baseUrl + image,
      };
    });

    res.status(200).json(updatedResult);
  } catch (e) {
    res.status(500).json({ message: "Error from getAllCountry", error: e.message });
  }
};
