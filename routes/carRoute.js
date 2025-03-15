import express from "express";
import { getMid } from "../controllers/cars/getMid.js";
import { createMidCar } from "../controllers/cars/createCar.js";
import { updateCarMid } from "../controllers/cars/updateMidCar.js";
import { getMidById } from "../controllers/cars/getMidById.js";
import { deleteMidCar } from "../controllers/cars/deleteMidCar.js";
import fileUpload from "../middlewares/multer.js";
import { getLiked } from "../controllers/cars/getLiked.js";
import { getAllLiked } from "../controllers/getAllLiked.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     cars:
 *       type: object
 *       required:
 *         - image
 *         - country
 *         - year
 *         - cost
 *         - milage
 *         - engine
 *         - volume
 *         - horsepower
 *         - drive
 *         - checkpoint
 *         - statement
 *         - authoremail
 *         - mark_id
 *         - model
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique car identifier
 *         color:
 *           type: string
 *           description: Car color
 *         image:
 *           type: array
 *           items:
 *             type: string
 *             format: binary
 *           description: Image URLs
 *         country:
 *           type: string
 *           description: Manufacturing country
 *         year:
 *           type: integer
 *           description: Manufacturing year
 *         cost:
 *           type: number
 *           format: float
 *           description: Car cost
 *         milage:
 *           type: integer
 *           description: Car mileage
 *         engine:
 *           type: string
 *           enum:
 *             - petrol
 *             - electric
 *             - hybrid
 *             - diesel
 *           description: Fuel type
 *         volume:
 *           type: number
 *           format: float
 *           description: Engine volume
 *         horsepower:
 *           type: integer
 *           description: Horsepower
 *         drive:
 *           type: string
 *           enum:
 *             - AWD
 *             - FWD
 *             - RWD
 *           description: Drive type
 *         checkpoint:
 *           type: string
 *           enum:
 *             - automatic
 *             - manual
 *           description: Transmission type
 *         doors:
 *           type: integer
 *           default: 4
 *           description: Number of doors
 *         body:
 *           type: string
 *           enum:
 *             - hatchback
 *             - convertible
 *             - crossover
 *             - coupe
 *             - sedan
 *             - pickup
 *             - suv
 *             - van
 *             - mpv
 *             - jeep
 *             - wagon
 *             - cabriolet
 *             - roadster
 *             - microcar
 *             - estate
 *             - saloon
 *             - city-car
 *           description: Body type
 *         statement:
 *           type: string
 *           enum:
 *             - used
 *             - new
 *           description: Car condition
 *         description:
 *           type: string
 *           description: Car description
 *         authoremail:
 *           type: string
 *           description: Seller's email
 *         rate:
 *           type: string
 *           enum:
 *             - cash
 *             - credit
 *           description: Payment method
 *         mark_id:
 *           type: number
 *           description: Only mark's id
 *         model:
 *           type: string
 *           description: Car model
 */

router.get("/cars", getMid);

router.get("/cars/:id", getMidById);

router.post("/add-car", fileUpload.array("image", 10), createMidCar);

router.put("/update-car/:id", fileUpload.array("image", 10), updateCarMid);

router.delete("/delete-car/:id", deleteMidCar);

router.post("/liked-car/:id", getLiked);

router.get("/favourite", getAllLiked);

export default router;
