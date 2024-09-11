import express from "express";
import { getMid } from "../middlewares/cars/getMid.js";
import { createMidCar } from "../middlewares/cars/createCar.js";
import { updateCarMid } from "../middlewares/cars/updateMidCar.js";
import { getMidById } from "../middlewares/cars/getMidById.js";
import { deleteMidCar } from "../middlewares/cars/deleteMidCar.js";

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
 *         - fuel
 *         - volume
 *         - horsepower
 *         - drive
 *         - checkpoint
 *         - statement
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique car identifier
 *         image:
 *           type: string
 *           description: Image URL
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
 *           type: number
 *           description: Car mileage
 *         fuel:
 *           type: string
 *           enum:
 *             - oil
 *             - electric
 *             - hybrid
 *           description: Fuel type
 *         volume:
 *           type: number
 *           description: Engine volume
 *         horsepower:
 *           type: number
 *           description: Horsepower
 *         drive:
 *           type: string
 *           enum:
 *             - both
 *             - all
 *           description: Drive type
 *         checkpoint:
 *           type: string
 *           enum:
 *             - automatic
 *             - manual
 *           description: Transmission type
 *         doors:
 *           type: integer
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
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date added
 */

const router = express.Router();

/**
 * @swagger
 * /cars:
 *   get:
 *     summary: Get all cars
 *     tags: [cars]
 *     responses:
 *       200:
 *         description: List of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/cars'
 *       404:
 *         description: Cars not found
 *       400:
 *         description: Error occurred
 */
router.get("/cars", getMid);

/**
 * @swagger
 * /cars/{id}:
 *   get:
 *     summary: Get a car by ID
 *     tags: [cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Car ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Car details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/cars'
 *       404:
 *         description: Car not found
 *       400:
 *         description: Error retrieving car
 */
router.get("/cars/:id", getMidById);

/**
 * @swagger
 * /add-car:
 *   post:
 *     summary: Add a new car
 *     tags: [cars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/cars'
 *     responses:
 *       201:
 *         description: Car added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/cars'
 *       400:
 *         description: Error adding car
 */
router.post("/add-car", createMidCar);

/**
 * @swagger
 * /update-car/{id}:
 *   put:
 *     summary: Update car details
 *     tags: [cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Car ID to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/cars'
 *     responses:
 *       200:
 *         description: Car updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/cars'
 *       400:
 *         description: Error updating car
 *       404:
 *         description: Car not found
 */
router.put("/update-car/:id", updateCarMid);

/**
 * @swagger
 * /delete-car/{id}:
 *   delete:
 *     summary: Delete a car
 *     tags: [cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Car ID to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Car deleted
 *       404:
 *         description: Car not found
 *       400:
 *         description: Error deleting car
 */
router.delete("/delete-car/:id", deleteMidCar);

export default router;
