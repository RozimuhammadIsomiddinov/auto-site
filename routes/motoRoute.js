import express from "express";
import { getMidMotorcycle } from "../controllers/moto/getAllMoto.js";
import { createMidMotorcycle } from "../controllers/moto/createMoto.js";
import { updateMotorcycleMid } from "../controllers/moto/updateMoto.js";
import { getMidMotorcycleById } from "../controllers/moto/getByIdMoto.js";
import { deleteMidMotorcycle } from "../controllers/moto/deleteMoto.js";
import fileUpload from "../middlewares/multer.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     motorcycles:
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
 *           description: Unique motorcycle identifier
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
 *           description: Motorcycle cost
 *         milage:
 *           type: number
 *           description: Motorcycle mileage
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
 *         statement:
 *           type: string
 *           enum:
 *             - used
 *             - new
 *           description: Motorcycle condition
 *         description:
 *           type: string
 *           description: Motorcycle description
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date added
 */

const router = express.Router();

/**
 * @swagger
 * /motorcycles:
 *   get:
 *     summary: Get all motorcycles
 *     tags: [motorcycles]
 *     responses:
 *       200:
 *         description: List of motorcycles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/motorcycles'
 *       404:
 *         description: Motorcycles not found
 *       400:
 *         description: Error occurred
 */
router.get("/motorcycles", getMidMotorcycle);

/**
 * @swagger
 * /motorcycles/{id}:
 *   get:
 *     summary: Get a motorcycle by ID
 *     tags: [motorcycles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Motorcycle ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Motorcycle details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/motorcycles'
 *       404:
 *         description: Motorcycle not found
 *       400:
 *         description: Error retrieving motorcycle
 */
router.get("/motorcycles/:id", getMidMotorcycleById);

/**
 * @swagger
 * /add-motorcycle:
 *   post:
 *     summary: Add a new motorcycle
 *     tags: [motorcycles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/motorcycles'
 *     responses:
 *       201:
 *         description: Motorcycle added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/motorcycles'
 *       400:
 *         description: Error adding motorcycle
 */
router.post(
  "/add-motorcycle",
  fileUpload.array("image", 10),
  createMidMotorcycle
);

/**
 * @swagger
 * /update-motorcycle/{id}:
 *   put:
 *     summary: Update motorcycle details
 *     tags: [motorcycles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Motorcycle ID to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/motorcycles'
 *     responses:
 *       200:
 *         description: Motorcycle updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/motorcycles'
 *       400:
 *         description: Error updating motorcycle
 *       404:
 *         description: Motorcycle not found
 */
router.put("/update-motorcycle/:id", updateMotorcycleMid);

/**
 * @swagger
 * /delete-motorcycle/{id}:
 *   delete:
 *     summary: Delete a motorcycle
 *     tags: [motorcycles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Motorcycle ID to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Motorcycle deleted
 *       404:
 *         description: Motorcycle not found
 *       400:
 *         description: Error deleting motorcycle
 */
router.delete("/delete-motorcycle/:id", deleteMidMotorcycle);

export default router;
