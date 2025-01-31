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
const { searchCommerce } = require("../controllers/filter/commerceFilter.js");
const {
  getLikedCommerce,
} = require("../controllers/commerce/getLikedCommerce.js");
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
 *           default: white
 *         image:
 *           type: array
 *           items:
 *             type: string
 *             format: binary
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
 *           type: string
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
 *           default: new
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
 *           default: cash
 *         model:
 *           type: string
 *           description: Car brand
 *         mark_id:
 *           type: number
 *           description: only mark's id
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
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
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
 *       - in: query
 *         name: authoremail
 *         required: true
 *         description: User email for deleting
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

/**
 * @swagger
 * /liked-commerce/{id}:
 *   get:
 *     summary: Add or subtract a like from a car
 *     tags: [CommerceCar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Car ID
 *         schema:
 *           type: integer
 *       - in: query
 *         name: user_id
 *         required: true
 *         description: User ID who is liking/disliking the car
 *         schema:
 *           type: integer
 *       - in: query
 *         name: count
 *         required: true
 *         description: Number to increment or decrement the like count (1 or -1)
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Like count updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommerceCar'
 *       400:
 *         description: User not registered or other error occurred
 *       404:
 *         description: Car not found
 */

router.get("/liked-commerce/:id", getLikedCommerce);
module.exports = router;
