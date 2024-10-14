const express = require("express");
const { getMidNews } = require("../controllers/news/getAllNews");
const { getMidNewsById } = require("../controllers/news/getById");
const getVehicleMid = require("../controllers/news/getVehicle");

const router = express.Router();

/**
 * @swagger
 * /news:
 *   get:
 *     summary: Retrieve all news
 *     description: Get a list of all news with optional pagination.
 *     tags: [News]
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
 *         description: A list of news.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The news ID
 *                   title:
 *                     type: string
 *                     description: The title of the news
 *                   content:
 *                     type: string
 *                     description: The news content
 *       404:
 *         description: No news found
 */
router.get("/news", getMidNews);

/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: Get news by ID
 *     description: Retrieve a specific news item by its ID.
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The news ID
 *     responses:
 *       200:
 *         description: A single news item.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The news ID
 *                 title:
 *                   type: string
 *                   description: The title of the news
 *                 content:
 *                   type: string
 *                   description: The news content
 *       404:
 *         description: News not found
 */
router.get("/news/:id", getMidNewsById);
/**
 * @swagger
 * /vehicle-news:
 *   get:
 *     summary: Retrieve all news
 *     description: Get a list of all news with optional pagination.
 *     tags: [News]
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
 *         description: A list of news.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The news ID
 *                   title:
 *                     type: string
 *                     description: The title of the news
 *                   content:
 *                     type: string
 *                     description: The news content
 *       404:
 *         description: No news found
 */
router.get("/vehicle-news", getVehicleMid);
module.exports = router;
