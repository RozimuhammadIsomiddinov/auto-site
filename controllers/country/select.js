import Country from "../../data/models/country.js";

export const getAllCountry = async (req, res) => {
  try {
    const result = await Country.findAll();
    res.status(200).json(result);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error from getAllCountry", error: e.message });
  }
};
