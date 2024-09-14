import Motorcycle from "../models/moto.js";

// Read all motorcycles
export const getAllMotorcycles = async () => {
  try {
    const result = await Motorcycle.findAll();
    return result;
  } catch (e) {
    return e.message;
  }
};

// Read motorcycle by ID
export const getMotorcycleById = async (id) => {
  try {
    const res = await Motorcycle.findByPk(id);
    return res;
  } catch (e) {
    return e.message;
  }
};

// Create a new motorcycle
export const addMotorcycle = async (motorcycleData) => {
  try {
    const newMotorcycle = await Motorcycle.create(motorcycleData);
    return newMotorcycle;
  } catch (e) {
    return "Error adding motorcycle: " + e.message;
  }
};

// Update an existing motorcycle
export const updateMotorcycle = async (upData) => {
  try {
    const { body, params } = upData;
    const motorcycle = await Motorcycle.findByPk(params.id);

    if (!motorcycle) {
      return { error: "Motorcycle not found" };
    }

    const updatedMotorcycle = await motorcycle.update({
      image: body.image,
      country: body.country,
      year: body.year,
      cost: body.cost,
      milage: body.milage,
      fuel: body.fuel,
      volume: body.volume,
      horsepower: body.horsepower,
      drive: body.drive,
      transmission: body.transmission,
      body: body.body,
      condition: body.condition,
      description: body.description,
    });

    return updatedMotorcycle;
  } catch (e) {
    return "Error updating motorcycle: " + e.message;
  }
};

// Delete a motorcycle by ID
export const deleteMotorcycle = async (id) => {
  try {
    const result = await Motorcycle.destroy({ where: { id } });
    return result;
  } catch (err) {
    return err.message;
  }
};
