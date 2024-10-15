const express = require("express");
const { getMidNews } = require("../controllers/news/getAllNews");
const { getMidNewsById } = require("../controllers/news/getById");
const getVehicleMid = require("../controllers/news/getVehicle");
const fileUpload = require("../middlewares/multer.js");
const { createMidNews } = require("../controllers/news/createNews.js");

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     News:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - image
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique ID of the news article
 *         title:
 *           type: string
 *           description: The title of the news article
 *         content:
 *           type: string
 *           description: The content of the news article
 *         vehicle:
 *           type: boolean
 *           default: false
 *           description: Whether the news is related to vehicles
 *         author:
 *           type: string
 *           default: admin
 *           description: The author of the news article
 *         image:
 *           type: string
 *           format: binary
 *           description: URL of the news image
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the news article was created
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the news article was last updated
 */

/**
 * @swagger
 * /news:
 *   get:
 *     summary: Retrieve all news articles
 *     description: Get a list of all news articles with optional pagination.
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: Number of news articles per page
 *     responses:
 *       200:
 *         description: A list of news articles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/News'
 *       404:
 *         description: No news articles found
 */

/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: Get a news article by ID
 *     description: Retrieve a specific news article by its ID.
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the news article
 *     responses:
 *       200:
 *         description: A single news article.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       404:
 *         description: News article not found
 */

/**
 * @swagger
 * /vehicle-news:
 *   get:
 *     summary: Retrieve all vehicle-related news
 *     description: Get a list of all news articles related to vehicles, with optional pagination.
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: Number of news articles per page
 *     responses:
 *       200:
 *         description: A list of vehicle-related news articles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/News'
 *       404:
 *         description: No vehicle-related news articles found
 */

/**
 * @swagger
 * /add-news:
 *   post:
 *     summary: Create a new news article
 *     description: Add a new news article to the database.
 *     tags: [News]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/News'
 *     responses:
 *       201:
 *         description: News article created successfully
 *       400:
 *         description: Bad request, validation failed
 */
router.get("/news", getMidNews);
router.get("/news/:id", getMidNewsById);
router.get("/vehicle-news", getVehicleMid);
router.post("/add-news", fileUpload.single("image"), createMidNews);
module.exports = router;
