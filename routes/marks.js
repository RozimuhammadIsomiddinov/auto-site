const express = require("express");
const fileUpload = require("../middlewares/multer");
const getAllMark = require("../controllers/mark/getMark");
const getByIdMark = require("../controllers/mark/getById");
const { createMark } = require("../controllers/mark/createMark");
const { getByIDMark } = require("../controllers/mark/getByIDMark");
const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Marks:
 *       type: object
 *       required:
 *         - mark_name
 *         - image
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the car mark
 *         mark_name:
 *           type: string
 *           description: Name of the car mark
 *         image:
 *           type: string
 *           description: URL of the mark's image
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date the mark was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date the mark was last updated
 */

/**
 * @swagger
 * /marks:
 *   get:
 *     summary: Get a paginated list of all car marks
 *     tags: [Marks]
 *     parameters:
 *       - in: params
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: The number of car marks to return per page
 *     responses:
 *       200:
 *         description: List of car marks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mark'
 *       404:
 *         description: No marks available
 *       400:
 *         description: Error occurred while retrieving marks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /mark/{id}:
 *   get:
 *     summary: Get cars, motorcycles, and commerce vehicles by mark with pagination
 *     tags: [Marks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The car mark to filter the vehicles by
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of results to return per page
 *     responses:
 *       200:
 *         description: A list of vehicles by mark (cars, motorcycles, commerce vehicles)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 vehicles:
 *                   type: object
 *                   properties:
 *                     resultCars:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Car'
 *                     resultMoto:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Motorcycle'
 *                     resultCommerce:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/CommerceCar'
 *       400:
 *         description: Error occurred while retrieving vehicles by mark
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /add-mark:
 *   post:
 *     summary: Create a new car mark
 *     tags: [Marks]
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
 *               mark_name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mark successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Marks'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
/**
 * @swagger
 * /marks/{id}:
 *   get:
 *     summary: Get a car mark by ID
 *     tags: [Marks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the car mark
 *     responses:
 *       200:
 *         description: Car mark retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Marks'
 *       404:
 *         description: Mark not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Error occurred while retrieving the mark
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */

router
  .get("/marks", getAllMark)
  .get("/marks/:id", getByIDMark)
  .get("/mark/:id", getByIdMark)
  .post("/add-mark", fileUpload.single("image"), createMark);

module.exports = router;
