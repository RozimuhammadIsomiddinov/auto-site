import express from "express";
import fileUpload from "../middlewares/multer.js";
import { getAllCountry } from "../controllers/country/select.js";
import { filter } from "../controllers/country/filter.js";
import { createCountry } from "../controllers/country/create.js";
import { filter_cars } from "../controllers/country/filter-car.js";
import { filter_moto } from "../controllers/country/filter-moto.js";
import { filter_commerce } from "../controllers/country/filter-commerce.js";
import { updateCountry } from "../controllers/country/update.js";

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
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file of the country's flag
 *               description:
 *                 type: string
 *                 example: "A country in Europe"
 *     responses:
 *       201:
 *         description: Country successfully added
 *       400:
 *         description: Bad request, missing or invalid parameters
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /country-cars:
 *   get:
 *     summary: Get cars by country
 *     tags: [Country]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Country name to filter cars
 *     responses:
 *       200:
 *         description: Successfully retrieved cars
 *       400:
 *         description: Missing or invalid parameters
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /country-moto:
 *   get:
 *     summary: Get motorcycles by country
 *     tags: [Country]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Country name to filter motorcycles
 *     responses:
 *       200:
 *         description: Successfully retrieved motorcycles
 *       400:
 *         description: Missing or invalid parameters
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /country-commerce:
 *   get:
 *     summary: Get commerce cars by country
 *     tags: [Country]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Country name to filter commerce cars
 *     responses:
 *       200:
 *         description: Successfully retrieved commerce cars
 *       400:
 *         description: Missing or invalid parameters
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /update-country/{id}:
 *   put:
 *     summary: Update an existing country
 *     tags: [Country]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the country to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "France"
 *               description:
 *                 type: string
 *                 example: "A European country"
 *     responses:
 *       200:
 *         description: Country successfully updated
 *       400:
 *         description: Bad request, invalid parameters
 *       404:
 *         description: Country not found
 *       500:
 *         description: Internal server error
 */

router.get("/country", getAllCountry);
router.get("/country-cars", filter_cars);
router.get("/country-moto", filter_moto);
router.get("/country-commerce", filter_commerce);
router.post("/filter", filter);
router.put("/update-country/:id", updateCountry);
router.post("/add-country", fileUpload.single("image"), createCountry);

export default router;
