import Motorcycle from "../models/moto.js";
import dotenv from "dotenv";

dotenv.config();

export const getAllMotorcycles = async (page = 1, pageSize = 10) => {
  try {
    const offset = (page - 1) * pageSize;
    return await Motorcycle.findAll({
      where: { archived: false },
      limit: pageSize,
      offset,
    });
  } catch (e) {
    return e.message;
  }
};

export const getMotorcycleById = async (id) => {
  try {
    return await Motorcycle.findByPk(id);
  } catch (e) {
    return e.message;
  }
};

export const getNewMoto = async (page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    return await Motorcycle.findAll({
      where: { condition: "new" },
      limit: pageSize,
      offset,
    });
  } catch (e) {
    return e.message;
  }
};

export const updateMotorcycle = async (upData) => {
  try {
    const { body, params, files } = upData;
    const motorcycle = await Motorcycle.findByPk(params.id);

    if (!motorcycle) {
      return { error: "Motorcycle not found" };
    }

    let imagePaths = motorcycle.image;
    if (files && files.length > 0) {
      imagePaths = files.map(
        (file) => `${process.env.BACKEND_URL}/${file?.filename}`
      );
    }

    return await motorcycle.update({
      image: imagePaths,
      color: body.color,
      country: body.country,
      year: body.year,
      cost: body.cost,
      milage: body.milage,
      engine: body.engine,
      volume: body.volume,
      horsepower: body.horsepower,
      drive: body.drive,
      transmission: body.transmission,
      body: body.body,
      condition: body.condition,
      description: body.description,
      authoremail: body.authorEmail,
      mark: body.mark,
      model: body.model,
    });
  } catch (e) {
    return "Error updating motorcycle: " + e.message;
  }
};

export const deleteMotorcycle = async (id) => {
  try {
    return await Motorcycle.destroy({ where: { id } });
  } catch (err) {
    return err.message;
  }
};
