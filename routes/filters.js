import express from "express";

import { searchCars } from "../controllers/filter/carFilter.js";
import { searchMoto } from "../controllers/filter/motoFilter.js";
import { searchCommerce } from "../controllers/filter/commerceFilter.js";
import { allFilter } from "../controllers/filter/allFilter.js";
import {
  beforeFilter,
  modelFilter,
} from "../controllers/filter/before-filter.js";

const router = express.Router();

/**
 * @swagger
 * /cars-filter:
 *   post:
 *     summary: Filter cars by year, price range, and pagination
 *     tags: [Filters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               maxYear:
 *                 type: integer
 *               minPrice:
 *                 type: number
 *               maxPrice:
 *                 type: number
 *               page:
 *                 type: integer
 *               rate:
 *                 type: string
 *                 enum: [cash, credit]
 *               model:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       200:
 *         description: A list of filtered cars
 *       500:
 *         description: Internal server error
 */
router.post("/cars-filter", searchCars);

/**
 * @swagger
 * /moto-filter:
 *   post:
 *     summary: Filter motorcycles by year, price range, and pagination
 *     tags: [Filters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               maxYear:
 *                 type: integer
 *               minPrice:
 *                 type: number
 *               maxPrice:
 *                 type: number
 *               page:
 *                 type: integer
 *               rate:
 *                 type: string
 *                 enum: [cash, credit]
 *               model:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       200:
 *         description: A list of filtered motorcycles
 *       500:
 *         description: Internal server error
 */
router.post("/moto-filter", searchMoto);

/**
 * @swagger
 * /commerce-filter:
 *   post:
 *     summary: Filter commercial vehicles by year, price range, and pagination
 *     tags: [Filters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               maxYear:
 *                 type: integer
 *               minPrice:
 *                 type: number
 *               maxPrice:
 *                 type: number
 *               page:
 *                 type: integer
 *               rate:
 *                 type: string
 *                 enum: [cash, credit]
 *               model:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       200:
 *         description: A list of filtered commercial vehicles
 *       500:
 *         description: Internal server error
 */
router.post("/commerce-filter", searchCommerce);

/**
 * @swagger
 * /before-filter:
 *   post:
 *     summary: Retrieve unique marks for cars, motorcycles, and commercial vehicles.
 *     tags: [Filters]
 *     responses:
 *       200:
 *         description: A list of unique marks for cars, motorcycles, and commercial vehicles.
 *       500:
 *         description: Internal server error
 */
router.post("/before-filter", beforeFilter);

/**
 * @swagger
 * /model-filter:
 *   post:
 *     summary: Retrieve models based on the specified mark for cars, motorcycles, and commercial vehicles.
 *     tags: [Filters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mark_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: A list of filtered models based on the specified mark.
 *       400:
 *         description: Mark parameter is required.
 *       500:
 *         description: Internal server error
 */
router.post("/model-filter", modelFilter);

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
 *                 enum: [cash, credit]
 *               maxYear:
 *                 type: integer
 *               minPrice:
 *                 type: number
 *               maxPrice:
 *                 type: number
 *               page:
 *                 type: integer
 *                 default: 1
 *     responses:
 *       200:
 *         description: A list of filtered vehicles
 *       500:
 *         description: Internal server error
 */
router.post("/all-filter", allFilter);

export default router;
