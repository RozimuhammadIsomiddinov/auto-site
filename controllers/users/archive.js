import Car from "../../data/models/automobile.js";
import CommerceCar from "../../data/models/commerce.js";
import Motorcycle from "../../data/models/moto.js";
import Users from "../../data/models/user.js";

export const getArchive = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "send a user id" });
  try {
    const user = await Users.findByPk(id);
    if (!user) return res.status(400).json({ message: "user not found" });

    const [car, moto, commerce] = await Promise.all([
      Car.findAll({ where: { archived: true, authoremail: user.email } }),
      Motorcycle.findAll({
        where: { archived: true, authoremail: user.email },
      }),
      CommerceCar.findAll({
        where: { archived: true, authoremail: user.email },
      }),
    ]);

    return res.status(200).json({ car, moto, commerce });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const addArchiveCar = async (req, res) => {
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

export const deleteArchiveCar = async (req, res) => {
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

export const addArchiveMoto = async (req, res) => {
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

export const deleteArchiveMoto = async (req, res) => {
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

export const addArchiveCommerce = async (req, res) => {
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

export const deleteArchiveCommerce = async (req, res) => {
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
