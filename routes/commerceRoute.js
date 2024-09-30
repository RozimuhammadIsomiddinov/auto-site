const express = require("express");
const { getMidCommerceCars } = require("../controllers/commerce/getMid.js");
const {
  createCommerceCar,
} = require("../controllers/commerce/createCommerce.js");
const {
  updateCommerceCarMid,
} = require("../controllers/commerce/updateCommerce.js");
const { getMidCommerceCarById } = require("../controllers/commerce/getById.js");
const {
  deleteMidCommerceCar,
} = require("../controllers/commerce/deleteCommerce.js");
const fileUpload = require("../middlewares/multer.js");
const { searchCommerce } = require("../controllers/search/searchCommerce.js");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CommerceCar:
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
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique car identifier
 *         image:
 *           type: string
 *           format: binary
 *           items:
 *             type: string
 *           description: List of image URLs
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
 *         engine:
 *           type: string
 *           enum:
 *             - petrol
 *             - electric
 *             - hybrid
 *             - diesel
 *           description: Fuel type
 *         volume:
 *           type: string
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
 *         stock:
 *           type: integer
 *           description: Available stock
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date added
 */

/**
 * @swagger
 * /commerce-cars:
 *   get:
 *     summary: Get all commerce cars
 *     tags: [CommerceCar]
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
 *         description: List of commerce cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CommerceCar'
 *       404:
 *         description: Cars not found
 *       400:
 *         description: Error occurred
 */
router.get("/commerce-cars", getMidCommerceCars);

/**
 * @swagger
 * /commerce-cars/{id}:
 *   get:
 *     summary: Get a commerce car by ID
 *     tags: [CommerceCar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Commerce car ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Commerce car details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommerceCar'
 *       404:
 *         description: Car not found
 *       400:
 *         description: Error retrieving car
 */
router.get("/commerce-cars/:id", getMidCommerceCarById);

/**
 * @swagger
 * /add-commerce-car:
 *   post:
 *     summary: Add a new commerce car
 *     tags: [CommerceCar]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/CommerceCar'
 *     responses:
 *       201:
 *         description: Commerce car added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommerceCar'
 *       400:
 *         description: Error adding commerce car
 */
router.post(
  "/add-commerce-car",
  fileUpload.array("image", 10),
  createCommerceCar
);

/**
 * @swagger
 * /update-commerce-car/{id}:
 *   put:
 *     summary: Update commerce car details
 *     tags: [CommerceCar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Commerce car ID to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/CommerceCar'
 *     responses:
 *       200:
 *         description: Commerce car updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommerceCar'
 *       400:
 *         description: Error updating commerce car
 *       404:
 *         description: Car not found
 */
router.put(
  "/update-commerce-car/:id",
  fileUpload.array("image", 10),
  updateCommerceCarMid
);

/**
 * @swagger
 * /delete-commerce-car/{id}:
 *   delete:
 *     summary: Delete a commerce car
 *     tags: [CommerceCar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Commerce car ID to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Commerce car deleted
 *       404:
 *         description: Car not found
 *       400:
 *         description: Error deleting car
 */
router.delete("/delete-commerce-car/:id", deleteMidCommerceCar);
router.get("/commerce-filter", searchCommerce);
module.exports = router;
