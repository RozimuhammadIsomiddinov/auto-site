const express = require("express");
const { getMidMotorcycle } = require("../controllers/moto/getAllMoto.js");
const { createMidMotorcycle } = require("../controllers/moto/createMoto.js");
const { updateMotorcycleMid } = require("../controllers/moto/updateMoto.js");
const { getMidMotorcycleById } = require("../controllers/moto/getByIdMoto.js");
const { deleteMidMotorcycle } = require("../controllers/moto/deleteMoto.js");
const { searchMoto } = require("../controllers/filter/motoFilter.js");
const fileUpload = require("../middlewares/multer.js");
const { getLikedMoto } = require("../controllers/moto/getLikedMoto.js");

/**
 * @swagger
 * components:
 *   schemas:
 *     Motorcycle:
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
 *         - transmission
 *         - body
 *         - condition
 *         - authoremail
 *         - mark
 *         - model
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique motorcycle identifier
 *         color:
 *           type: string
 *           description: Motorcycle color
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
 *           description: Motorcycle cost
 *         milage:
 *           type: integer
 *           description: Motorcycle mileage
 *         engine:
 *           type: string
 *           enum:
 *             - petrol
 *             - electric
 *             - hybrid
 *           description: Fuel type
 *           default: petrol
 *         volume:
 *           type: string
 *           description: Engine volume
 *         horsepower:
 *           type: integer
 *           description: Horsepower
 *         drive:
 *           type: string
 *           enum:
 *             - chain
 *             - belt
 *             - shaft
 *           description: Drive type
 *           default: chain
 *         transmission:
 *           type: string
 *           enum:
 *             - manual
 *             - automatic
 *           description: Transmission type
 *           default: manual
 *         body:
 *           type: string
 *           enum:
 *             - cruiser
 *             - sport
 *             - touring
 *             - standard
 *             - dual-sport
 *             - dirt-bike
 *             - naked-bike
 *             - scooter
 *             - adventure
 *             - bobber
 *             - cafe-racer
 *             - chopper
 *           description: Motorcycle body type
 *         condition:
 *           type: string
 *           enum:
 *             - used
 *             - new
 *           description: Motorcycle condition
 *           default: new
 *         description:
 *           type: string
 *           description: Motorcycle description
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
 *         mark_id:
 *           type: number
 *           description: Motorcycle brand
 *         model:
 *           type: string
 *           description: Motorcycle model
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
 *                 $ref: '#/components/schemas/Motorcycle'
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
 *               $ref: '#/components/schemas/Motorcycle'
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Motorcycle'
 *     responses:
 *       201:
 *         description: Motorcycle added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Motorcycle'
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
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Motorcycle'
 *     responses:
 *       200:
 *         description: Motorcycle updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Motorcycle'
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
 *         description: Motorcycle ID to update
 *       - in: query
 *         name: authoremail
 *         require: true
 *         description: Motorcycle ID to update
 *         schema:
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

/**
 * @swagger
 * /liked-moto/{id}:
 *   get:
 *     summary: Add or subtract a like from a car
 *     tags: [motorcycles]
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
 *               $ref: '#/components/schemas/Motorcycle'
 *       400:
 *         description: User not registered or other error occurred
 *       404:
 *         description: Car not found
 */

router.get("/liked-moto/:id", getLikedMoto);
module.exports = router;
