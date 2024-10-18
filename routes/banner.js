const express = require("express");
const getNewVehicleMid = require("../controllers/news/getNewVehicle");
const router = express.Router();

/**
 * @swagger
 * /banner:
 *   get:
 *     summary: Get a list of new vehicles
 *     tags: [Vehicles]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: pageSize
 *         in: query
 *         description: Number of items per page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 2
 *     responses:
 *       200:
 *         description: A list of new vehicles
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
 *                     example: "New Vehicle Name"
 *                   description:
 *                     type: string
 *                     example: "Description of the new vehicle"
 *       404:
 *         description: No news of vehicle available
 *       400:
 *         description: Error fetching vehicles
 */

router.get("/banner", getNewVehicleMid);
module.exports = router;
