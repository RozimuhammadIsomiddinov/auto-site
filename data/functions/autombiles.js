import Car from "../models/automobile.js";

//read
export const getAllCars = async () => {
  try {
    const result = await Car.findAll();
    return result;
  } catch (e) {
    return e.message;
  }
};
export const getCarById = async (id) => {
  try {
    const res = await Car.findByPk(id);
    return res;
  } catch (e) {
    return e.message;
  }
};

//create
export const addCar = async (carData) => {
  try {
    const newCar = await Car.create(carData);
    return newCar;
  } catch (e) {
    return "Error adding car" + e.message;
  }
};
//update
export const updateCar = async (upData) => {
  //updata has got params and body
  try {
    const { body, params } = upData;
    const car = await Car.findByPk(params.id);

    if (!car) {
      return { error: "car not found" };
    }
    const updatedCar = await car.update({
      image: body.image,
      country: body.country,
      year: body.year,
      cost: body.cost,
      milage: body.milage,
      fuel: body.fuel,
      volume: body.volume,
      horsepower: body.horsepower,
      drive: body.drive,
      checkpoint: body.checkpoint,
      doors: body.doors,
      body: body.body,
      statement: body.statement,
      description: body.description,
    });

    return updatedCar;
  } catch (e) {
    return "Error updating car\n" + e.message;
  }
};
//delete
export const deleteCar = async (id) => {
  try {
    const result = await Car.destroy({ where: { id } });
    return result;
  } catch (err) {
    return err.message;
  }
};
