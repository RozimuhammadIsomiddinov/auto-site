const Country = require("../../data/models/country");

const updateCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const [__, updated] = await Country.update(
      { name, description },
      { where: { id }, returning: true }
    );

    res.status(201).json({ message: "succesfully", updated });
  } catch (e) {
    return res.status(400).send("error of updateCountry:\n" + e.message);
  }
};

module.exports = updateCountry;
