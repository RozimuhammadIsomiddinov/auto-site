import CommerceCar from "../models/commerce.js";

export const getAllCommerceCars = async (page = 1, pageSize = 10) => {
  try {
    const offset = (page - 1) * pageSize;
    return await CommerceCar.findAll({
      where: { archived: false },
      limit: pageSize,
      offset,
    });
  } catch (e) {
    return `Error getting commerce cars: ${e.message}`;
  }
};

export const getCommerceCarById = async (id) => {
  try {
    return await CommerceCar.findByPk(id);
  } catch (e) {
    return e.message;
  }
};

export const getNewCommerce = async (page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    return await CommerceCar.findAll({
      where: { statement: "new" },
      limit: pageSize,
      offset,
    });
  } catch (e) {
    return e.message;
  }
};

export const addCommerceCar = async (carData) => {
  try {
    return await CommerceCar.create(carData);
  } catch (e) {
    return `Error adding commerce car: ${e.message}`;
  }
};

export const updateCommerceCar = async (upData) => {
  try {
    const { body, params } = upData;
    const commerceCar = await CommerceCar.findByPk(params.id);
    if (!commerceCar) return { error: "Commerce car not found" };

    let imagePaths = commerceCar.image;
    if (upData.files?.length > 0) {
      imagePaths = upData.files.map(
        (file) => `${process.env.BACKEND_URL}/${file?.filename}`
      );
    }

    return await commerceCar.update({
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
  } catch (e) {
    return `Error updating commerce car: ${e.message}`;
  }
};

export const deleteCommerceCar = async (id) => {
  try {
    return await CommerceCar.destroy({ where: { id } });
  } catch (err) {
    return `Error deleting commerce car: ${err.message}`;
  }
};
