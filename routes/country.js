const express = require("express");
const fileUpload = require("../middlewares/multer.js");
const getAllCountry = require("../controllers/country/select.js");
const filter = require("../controllers/country/filter.js");
const createCountry = require("../controllers/country/create.js");
const router = express.Router();

/**
 * @swagger
 * /country:
 *   get:
 *     summary: Get all countries
 *     tags: [Country]
 *     responses:
 *       200:
 *         description: Successfully retrieved all countries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Uzbekistan"
 *                   image:
 *                     type: string
 *                     example: "https://example.com/flag.png"
 *       404:
 *         description: No countries found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /filter:
 *   post:
 *     summary: Filter vehicles by country
 *     tags: [Country]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Germany"
 *                 description: The country name to filter vehicles by.
 *     responses:
 *       200:
 *         description: Successfully retrieved filtered vehicles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cars:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "BMW X5"
 *                       country:
 *                         type: string
 *                         example: "Germany"
 *                 motorcycles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 2
 *                       name:
 *                         type: string
 *                         example: "Harley-Davidson"
 *                       country:
 *                         type: string
 *                         example: "USA"
 *                 commerceCars:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 3
 *                       name:
 *                         type: string
 *                         example: "Mercedes Sprinter"
 *                       country:
 *                         type: string
 *                         example: "Germany"
 *       400:
 *         description: Bad request, missing or invalid parameters
 *       404:
 *         description: No vehicles found for the given country
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /add-country:
 *   post:
 *     summary: Add a new country
 *     tags: [Country]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 example: "France"
 *                 description: Name of the country
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file of the country's flag
 *               description:
 *                 type: string
 *                 example: "A country in Europe"
 *                 description: Description of the country
 *     responses:
 *       201:
 *         description: Country successfully added
 *       400:
 *         description: Bad request, missing or invalid parameters
 *       500:
 *         description: Internal server error
 */

router.get("/country", getAllCountry);
router.post("/filter", filter);
router.post("/add-country", fileUpload.single("image"), createCountry);

module.exports = router;
