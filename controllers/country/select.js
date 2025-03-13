const Country = require("../../data/models/country");

const getAllCountry = async (req, res) => {
  try {
    const result = await Country.findAll();
    /*if (result.length == 0) {
      return res.status(404).json({ message: "country have not yet!" });
    }*/
    res.status(200).json(result);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error from getAllCountry", error: e.message });
  }
};

module.exports = getAllCountry;
