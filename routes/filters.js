const express = require("express");

const { searchCars } = require("../controllers/filter/carFilter.js");
const { searchMoto } = require("../controllers/filter/motoFilter.js");
const { searchCommerce } = require("../controllers/filter/commerceFilter.js");
const allFilter = require("../controllers/filter/allFilter.js");
const {
  beforeFilter,
  modelFilter,
} = require("../controllers/filter/before-filter.js");
const router = express.Router();

/**
 * @swagger
 * /cars-filter:
 *   post:
 *     summary: Filter cars by year, price range, and pagination
 *     tags: [Filters]
 *     parameters:
 *       - in: query
 *         name: maxYear
 *         schema:
 *           type: integer
 *         description: Filter cars by year
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Filter cars by minimum price
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Filter cars by maximum price
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: Number of cars per page for pagination
 *       - in: query
 *         name: statement
 *         schema:
 *           type: string
 *           enum:
 *             - new
 *             - used
 *         description: statement of cars
 *       - in: query
 *         name: rate
 *         schema:
 *           type: string
 *           enum:
 *             - cash
 *             - credit
 *         description: The rate of the commercial vehicles
 *     responses:
 *       200:
 *         description: A list of filtered cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/cars'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /moto-filter:
 *   post:
 *     summary: Filter motorcycles by year, price range, and pagination
 *     tags: [Filters]
 *     parameters:
 *       - in: query
 *         name: maxYear
 *         schema:
 *           type: integer
 *         description: Filter motorcycles by year
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Filter motorcycles by minimum price
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Filter motorcycles by maximum price
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: Number of motorcycles per page for pagination
 *       - in: query
 *         name: condition
 *         schema:
 *           type: string
 *           enum:
 *             - new
 *             - used
 *         description: condition of cars
 *       - in: query
 *         name: rate
 *         schema:
 *           type: string
 *           enum:
 *             - cash
 *             - credit
 *         description: The rate of the commercial vehicles
 *     responses:
 *       200:
 *         description: A list of filtered motorcycles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Motorcycle'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /commerce-filter:
 *   post:
 *     summary: Filter commercial vehicles by year, price range, and pagination
 *     tags: [Filters]
 *     parameters:
 *       - in: query
 *         name: maxYear
 *         schema:
 *           type: integer
 *         description: Filter commercial vehicles by year
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Filter commercial vehicles by minimum price
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Filter commercial vehicles by maximum price
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: Number of commercial vehicles per page for pagination
 *       - in: query
 *         name: statement
 *         schema:
 *           type: string
 *           enum:
 *             - new
 *             - used
 *         description: statement of cars
 *       - in: query
 *         name: rate
 *         schema:
 *           type: string
 *           enum:
 *             - cash
 *             - credit
 *         description: The rate of the commercial vehicles
 *     responses:
 *       200:
 *         description: A list of filtered commercial vehicles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CommerceCar'
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /all-filter:
 *   post:
 *     summary: Filter all vehicles by year, price range, and pagination
 *     tags: [Filters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               model:
 *                 type: string
 *               country:
 *                 type: string
 *               rate:
 *                 type: string
 *                 enum:
 *                   - cash
 *                   - credit
 *               statement:
 *                 type: string
 *                 enum:
 *                   - new
 *                   - used
 *               maxYear:
 *                 type: integer
 *               minPrice:
 *                 type: number
 *               maxPrice:
 *                 type: number
 *               page:
 *                 type: integer
 *                 default: 1
 *               pageSize:
 *                 type: integer
 *                 default: 10
 *     responses:
 *       200:
 *         description: A list of filtered vehicles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cars:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/cars'
 *                 motorcycles:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Motorcycle'
 *                 count:
 *                   type: integer
 *                   description: Total count of all filtered vehicles
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /before-filter:
 *   post:
 *     summary: Retrieve unique marks for cars, motorcycles, and commercial vehicles.
 *     tags: [Filters]
 *     responses:
 *       200:
 *         description: A list of unique marks for cars, motorcycles, and commercial vehicles.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 car:
 *                   type: array
 *                   items:
 *                     type: string
 *                 moto:
 *                   type: array
 *                   items:
 *                     type: string
 *                 commerce:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /model-filter:
 *   post:
 *     summary: Retrieve models based on the specified mark for cars, motorcycles, and commercial vehicles.
 *     tags: [Filters]
 *     parameters:
 *       - in: query
 *         name: mark
 *         schema:
 *           type: string
 *         required: true
 *         description: The mark of the vehicle to filter models
 *     responses:
 *       200:
 *         description: A list of filtered models based on the specified mark.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cars:
 *                   type: array
 *                   items:
 *                     type: string
 *                 motorcycles:
 *                   type: array
 *                   items:
 *                     type: string
 *                 commerceCars:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Mark parameter is required.
 *       500:
 *         description: Internal server error
 */

router.post("/cars-filter", searchCars);
router.post("/moto-filter", searchMoto);
router.post("/commerce-filter", searchCommerce);
router.post("/before-filter", beforeFilter);
router.post("/model-filter", modelFilter);
router.post("/all-filter", allFilter);

module.exports = router;
