const CommerceCar = require("../models/commerce.js");

// Read all commerce cars
const getAllCommerceCars = async (page = 1, pageSize = 10) => {
  try {
    const offset = (page - 1) * pageSize;
    const result = await CommerceCar.findAll({
      limit: pageSize,
      offset,
    });
    return result;
  } catch (e) {
    return "Error getting commerce cars: " + e.message;
  }
};

// Read a commerce car by ID
const getCommerceCarById = async (id) => {
  try {
    const res = await CommerceCar.findByPk(id);
    return res;
  } catch (e) {
    return e.message;
  }
};

const getNewCommerce = async (page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    const result = await CommerceCar.findAll({
      where: { statement: "new" },
      limit: pageSize,
      offset,
    });
    return result;
  } catch (e) {
    return e.message;
  }
};
// Create a new commerce car
const addCommerceCar = async (carData) => {
  try {
    const newCar = await CommerceCar.create(carData);
    return newCar;
  } catch (e) {
    return "Error adding commerce car: " + e.message;
  }
};

// Update an existing commerce car
const updateCommerceCar = async (upData) => {
  // upData has got params and body
  try {
    const { body, params } = upData;
    const commerceCar = await CommerceCar.findByPk(params.id);

    if (!commerceCar) {
      return { error: "Commerce car not found" };
    }
    let imagePaths = commerceCar.image;
    if (upData.files && upData.files.length > 0) {
      imagePaths = upData.files.map(
        (file) => `${process.env.BACKEND_URL}/${file?.filename}`
      );
    }
    const updatedCar = await commerceCar.update({
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
      checkpoint: body.checkpoint,
      doors: body.doors,
      body: body.body,
      statement: body.statement,
      description: body.description,
      stock: body.stock,
      authoremail: body.authoremail,
      rate: body.rate,
      model: body.model,
      mark: body.mark,
    });

    return updatedCar;
  } catch (e) {
    return "Error updating commerce car: " + e.message;
  }
};

// Delete a commerce car
const deleteCommerceCar = async (id) => {
  try {
    const result = await CommerceCar.destroy({ where: { id } });
    return result;
  } catch (err) {
    return "Error deleting commerce car: " + err.message;
  }
};

module.exports = {
  getAllCommerceCars,
  getCommerceCarById,
  getNewCommerce,
  addCommerceCar,
  updateCommerceCar,
  deleteCommerceCar,
};
