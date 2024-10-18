const Motorcycle = require("../models/moto.js");
const dotenv = require("dotenv");
dotenv.config();
// Read all motorcycles
const getAllMotorcycles = async (page = 1, pageSize = 10) => {
  try {
    const offset = (page - 1) * pageSize;
    const result = await Motorcycle.findAll({
      limit: pageSize,
      offset,
    });
    return result;
  } catch (e) {
    return e.message;
  }
};

// Read motorcycle by ID
const getMotorcycleById = async (id) => {
  try {
    const res = await Motorcycle.findByPk(id);
    return res;
  } catch (e) {
    return e.message;
  }
};

const getNewMoto = async (page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    const result = await Motorcycle.findAll({
      where: { condition: "new" },
      limit: pageSize,
      offset,
    });
    return result;
  } catch (e) {
    return e.message;
  }
};

// Update an existing motorcycle
const updateMotorcycle = async (upData) => {
  try {
    const { body, params } = upData;
    const motorcycle = await Motorcycle.findByPk(params.id);

    if (!motorcycle) {
      return { error: "Motorcycle not found" };
    }
    let imagePaths = commerceCar.image;
    if (upData.files && upData.files.length > 0) {
      imagePaths = upData.files.map(
        (file) => `${process.env.BACKEND_URL}/${file?.filename}`
      );
    }
    const updatedMotorcycle = await motorcycle.update({
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

    return updatedMotorcycle;
  } catch (e) {
    return "Error updating motorcycle: " + e.message;
  }
};

// Delete a motorcycle by ID
const deleteMotorcycle = async (id) => {
  try {
    const result = await Motorcycle.destroy({ where: { id } });
    return result;
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  getAllMotorcycles,
  getMotorcycleById,
  getNewMoto,
  updateMotorcycle,
  deleteMotorcycle,
};
