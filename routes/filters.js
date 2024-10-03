const express = require("express");

const { searchCars } = require("../controllers/search/carSearch.js");
const { searchMoto } = require("../controllers/search/motoSearch.js");
const { searchCommerce } = require("../controllers/search/searchCommerce.js");
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
 *                 $ref: '#/components/schemas/Car'
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
 *                 $ref: '#/components/schemas/Commerce'
 *       500:
 *         description: Internal server error
 */

router.post("/cars-filter", searchCars);
router.post("/moto-filter", searchMoto);
router.post("/commerce-filter", searchCommerce);

module.exports = router;
