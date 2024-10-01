const express = require("express");
const { getMidMotorcycle } = require("../controllers/moto/getAllMoto.js");
const { createMidMotorcycle } = require("../controllers/moto/createMoto.js");
const { updateMotorcycleMid } = require("../controllers/moto/updateMoto.js");
const { getMidMotorcycleById } = require("../controllers/moto/getByIdMoto.js");
const { deleteMidMotorcycle } = require("../controllers/moto/deleteMoto.js");
const { searchMoto } = require("../controllers/search/motoSearch.js");
const fileUpload = require("../middlewares/multer.js");

/**
 * @swagger
 * components:
 *   schemas:
 *     motorcycles:
 *       type: object
 *       require:
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
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique motorcycle identifier
 *         image:
 *           type: string
 *           format: binary
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
 *         engine:
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
 *             - AWD
 *             - FWD
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
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: The number of items per page
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
 *         require: true
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
 *       require: true
 *       content:
 *         multipart/form-data:
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
 *         require: true
 *         description: Motorcycle ID to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       require: true
 *       content:
 *         multipart/form-data:
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
router.put(
  "/update-motorcycle/:id",
  fileUpload.array("image", 10),
  updateMotorcycleMid
);

/**
 * @swagger
 * /delete-motorcycle/{id}:
 *   delete:
 *     summary: Delete a motorcycle
 *     tags: [motorcycles]
 *     parameters:
 *       - in: path
 *         name: id
 *         require: true
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
router.get("/moto-filter", searchMoto);
module.exports = router;
