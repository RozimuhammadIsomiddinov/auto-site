import multer from "multer";
import Car from "../../data/models/automobile.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

export const uploadMiddleware = upload.array("image", 10);

export const createMidCar = async (req, res, next) => {
  try {
    const {
      country,
      year,
      cost,
      milage,
      fuel,
      volume,
      horsepower,
      drive,
      checkpoint,
      doors,
      body,
      statement,
      description,
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).send("You must upload at least one image.");
    }

    const imagePaths = req.files.map((file) => `uploads/${file.filename}`);

    const newCar = await Car.create({
      image: imagePaths,
      country,
      year,
      cost,
      milage,
      fuel,
      volume,
      horsepower,
      drive,
      checkpoint,
      doors,
      body,
      statement,
      description,
    });

    res.status(201).json({
      message: "Car added successfully",
      car: newCar,
    });
    next();
  } catch (e) {
    return res.status(400).send("Error in createMidCar:\n" + e.message);
  }
};
