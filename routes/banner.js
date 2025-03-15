import express from "express";
import {
  getNewVehicleMid,
  createBanner,
} from "../controllers/news/getNewVehicle.js";
import fileUpload from "../middlewares/multer.js";

const router = express.Router();

/**
 * @swagger
 * /banner:
 *   get:
 *     summary: Get a list of new vehicles
 *     tags: [Banner]
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

/**
 * @swagger
 * /create-banner:
 *   post:
 *     summary: Create a new banner
 *     tags: [Banner]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the banner
 *                 example: "Big Sale!"
 *               image:
 *                 type: array
 *                 format: binary
 *                 description: Array of image URLs for the banner
 *                 items:
 *                   type: string
 *               subtitle:
 *                 type: string
 *                 description: Subtitle of the banner
 *                 example: "Don't miss out on our huge discounts!"
 *     responses:
 *       201:
 *         description: Banner created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Banner created successfully."
 *                 banner:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "Big Sale!"
 *                     image:
 *                       type: array
 *                       format: binary
 *                       items:
 *                         type: string
 *                     subtitle:
 *                       type: string
 *                       example: "Don't miss out on our huge discounts!"
 *       400:
 *         description: Bad request, missing or invalid parameters
 *       500:
 *         description: Internal server error
 */

router.post("/create-banner", fileUpload.array("image", 5), createBanner);

export default router;
