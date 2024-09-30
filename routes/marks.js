const express = require("express");
const fileUpload = require("../middlewares/multer");
const getAllMark = require("../controllers/mark/getMark");
const getByIdMark = require("../controllers/mark/getById");
const { createMark } = require("../controllers/mark/createMark");
const router = express.Router();
/**
 * @swagger
 * /marks:
 *   get:
 *     summary: Get a paginated list of all car marks
 *     tags: [Marks]
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
 *         description: Error from getAllMark
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
 * /mark:
 *   get:
 *     summary: Get cars, motorcycles, and commerce vehicles by mark with pagination
 *     tags: [Marks]
 *     parameters:
 *       - in: query
 *         name: mark
 *         schema:
 *           type: string
 *         required: true
 *         description: The mark to filter the vehicles
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
 *         description: Error from getByIdMark
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mark successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mark'
 *       400:
 *         description: Bad request
 */

router.get("/marks", getAllMark);
router.get("/mark", getByIdMark);
router.post("/add-mark", fileUpload.single("image"), createMark);

module.exports = router;
