const Car = require("../../data/models/automobile");
const CommerceCar = require("../../data/models/commerce");
const Motorcycle = require("../../data/models/moto");

const addArchiveCar = async (req, res) => {
  const { id } = req.body;
  try {
    const [updatedRows, updatedCars] = await Car.update(
      { archived: true },
      {
        where: { id },
        returning: true,
      }
    );

    return res.status(200).json(updatedCars);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const deleteArchiveCar = async (req, res) => {
  const { id } = req.body;
  try {
    const [updatedRows, updatedCars] = await Car.update(
      { archived: false },
      {
        where: { id },
        returning: true,
      }
    );

    return res.status(200).json(updatedCars);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const addArchiveMoto = async (req, res) => {
  const { id } = req.body;
  try {
    const [updatedRows, updatedMoto] = await Motorcycle.update(
      { archived: true },
      {
        where: { id },
        returning: true,
      }
    );

    return res.status(200).json(updatedMoto);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const deleteArchiveMoto = async (req, res) => {
  const { id } = req.body;
  try {
    const [updatedRows, updatedMoto] = await Motorcycle.update(
      { archived: false },
      {
        where: { id },
        returning: true,
      }
    );

    return res.status(200).json(updatedMoto);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const addArchiveCommerce = async (req, res) => {
  const { id } = req.body;
  try {
    const [updatedRows, updatedCommerce] = await CommerceCar.update(
      { archived: true },
      {
        where: { id },
        returning: true,
      }
    );

    return res.status(200).json(updatedCommerce);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const deleteArchiveCommerce = async (req, res) => {
  const { id } = req.body;
  try {
    const [updatedRows, updatedCommerce] = await CommerceCar.update(
      { archived: false },
      {
        where: { id },
        returning: true,
      }
    );

    return res.status(200).json(updatedCommerce);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  addArchiveCar,
  addArchiveMoto,
  addArchiveCommerce,
  deleteArchiveCar,
  deleteArchiveMoto,
  deleteArchiveCommerce,
};
