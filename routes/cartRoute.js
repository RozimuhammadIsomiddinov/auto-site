import express from "express";
import { createMid } from "../controllers/cart/createCartMid.js";
import { getAllMid } from "../controllers/cart/getAllMid.js";
import { deleteCartMid } from "../controllers/cart/deleteCartMid.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       required:
 *         - user_id
 *         - product_id
 *         - product_type
 *         - quantity
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique cart item identifier
 *         user_id:
 *           type: integer
 *           description: ID of the user owning the cart
 *         product_id:
 *           type: integer
 *           description: ID of the product in the cart
 *         product_type:
 *           type: string
 *           description: Type of product in the cart (e.g., vehicle, electronics)
 *         quantity:
 *           type: integer
 *           description: Quantity of the product
 *         added_time:
 *           type: string
 *           format: date-time
 *           description: Time when the item was added to the cart
 */

/**
 * @swagger
 * /user-cart:
 *   get:
 *     summary: Get all cart items for the current user
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Successfully retrieved cart items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Cart not found
 *       400:
 *         description: Bad request
 */
router.get("/user-cart", getAllMid);

/**
 * @swagger
 * /create-item/{id}:
 *   post:
 *     summary: Add a new item to the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID to add to the cart
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: ID of the user adding the product
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product to add
 *               product_type:
 *                 type: string
 *                 description: Type of the product (e.g., vehicle, electronics)
 *     responses:
 *       201:
 *         description: Successfully added item to the cart
 *       400:
 *         description: Bad request
 */
router.post("/create-item/:id", createMid);

/**
 * @swagger
 * /delete-cart/{id}:
 *   delete:
 *     summary: Remove an item from the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the cart item to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted item from the cart
 *       404:
 *         description: Cart item not found
 *       400:
 *         description: Bad request
 */
router.delete("/delete-cart/:id", deleteCartMid);

export default router;
