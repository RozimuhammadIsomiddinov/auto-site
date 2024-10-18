const Car = require("../models/automobile.js");

//read
const getAllCars = async (page = 1, pageSize = 10) => {
  try {
    const offset = (page - 1) * pageSize;
    const result = await Car.findAll({
      limit: pageSize,
      offset,
    });
    return result;
  } catch (e) {
    return "Error getting car: " + e.message;
  }
};

const getCarById = async (id) => {
  try {
    const res = await Car.findByPk(id);
    return res;
  } catch (e) {
    return e.message;
  }
};
const getNewcar = async (page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    const result = await Car.findAll({
      where: { statement: "new" },
      limit: pageSize,
      offset,
    });
    return result;
  } catch (e) {
    return e.message;
  }
};

//create
const addCar = async (carData) => {
  try {
    const newCar = await Car.create(carData);
    return newCar;
  } catch (e) {
    return "Error adding car: " + e.message;
  }
};

//update
const updateCar = async (upData) => {
  // upData has got params and body
  try {
    const { body, params } = upData;
    const car = await Car.findByPk(params.id);

    if (!car) {
      return { error: "Car not found" };
    }
    let imagePaths = car.image;
    if (upData.files && upData.files.length > 0) {
      imagePaths = upData.files.map(
        (file) => `${process.env.BACKEND_URL}/${file?.filename}`
      );
    }
    const updatedCar = await car.update({
      color: body.color,
      image: imagePaths,
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
      authoremail: body.authoremail,
      mark: body.mark,
      model: body.model,
    });

    return updatedCar;
  } catch (e) {
    return "Error updating car: " + e.message;
  }
};

//delete
const deleteCar = async (id) => {
  try {
    const result = await Car.destroy({ where: { id } });
    return result;
  } catch (err) {
    return "Error deleting car: " + err.message;
  }
};

module.exports = {
  getAllCars,
  getCarById,
  getNewcar,
  addCar,
  updateCar,
  deleteCar,
};
