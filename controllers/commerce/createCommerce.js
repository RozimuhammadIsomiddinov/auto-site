const CommerceCar = require("../../data/models/commerce.js");
const dotenv = require("dotenv");
dotenv.config();

// Create a new commerce car
const createCommerceCar = async (req, res, next) => {
  try {
    const {
      country,
      year,
      cost,
      milage,
      engine,
      volume,
      horsepower,
      drive,
      checkpoint,
      doors,
      body,
      statement,
      description,
      stock,
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).send("Siz kamida bitta rasm yuklashingiz kerak.");
    }

    const imagePaths = req.files.map(
      (file) => `${process.env.BACKEND_URL}/${file?.filename}`
    );

    const newCommerceCar = await CommerceCar.create({
      image: imagePaths,
      country,
      year,
      cost,
      milage,
      engine,
      volume,
      horsepower,
      drive,
      checkpoint,
      doors,
      body,
      statement,
      description,
      stock,
    });

    res.status(201).json({
      message: "Commerce car muvaffaqiyatli qo'shildi",
      commerceCar: newCommerceCar,
    });
    next();
  } catch (e) {
    return res.status(400).send("createCommerceCar xatoligi:\n" + e.message);
  }
};

// Get all commerce cars
const getAllCommerceCars = async (req, res) => {
  try {
    const commerceCars = await CommerceCar.findAll();
    res.status(200).json(commerceCars);
  } catch (e) {
    res.status(400).send("getAllCommerceCars xatoligi:\n" + e.message);
  }
};

// Get a commerce car by ID
const getCommerceCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const commerceCar = await CommerceCar.findByPk(id);

    if (!commerceCar) {
      return res.status(404).send("Commerce car topilmadi");
    }

    res.status(200).json(commerceCar);
  } catch (e) {
    res.status(400).send("getCommerceCarById xatoligi:\n" + e.message);
  }
};

// Update a commerce car
const updateCommerceCar = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      country,
      year,
      cost,
      milage,
      engine,
      volume,
      horsepower,
      drive,
      checkpoint,
      doors,
      body,
      statement,
      description,
      stock,
    } = req.body;

    const commerceCar = await CommerceCar.findByPk(id);

    if (!commerceCar) {
      return res.status(404).send("Commerce car topilmadi");
    }

    const updatedCommerceCar = await commerceCar.update({
      country,
      year,
      cost,
      milage,
      engine,
      volume,
      horsepower,
      drive,
      checkpoint,
      doors,
      body,
      statement,
      description,
      stock,
    });

    res.status(200).json({
      message: "Commerce car muvaffaqiyatli yangilandi",
      commerceCar: updatedCommerceCar,
    });
  } catch (e) {
    res.status(400).send("updateCommerceCar xatoligi:\n" + e.message);
  }
};

// Delete a commerce car
const deleteCommerceCar = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await CommerceCar.destroy({ where: { id } });

    if (!result) {
      return res.status(404).send("Commerce car topilmadi");
    }

    res.status(200).json({
      message: "Commerce car muvaffaqiyatli o'chirildi",
    });
  } catch (e) {
    res.status(400).send("deleteCommerceCar xatoligi:\n" + e.message);
  }
};

module.exports = {
  createCommerceCar,
  getAllCommerceCars,
  getCommerceCarById,
  updateCommerceCar,
  deleteCommerceCar,
};
