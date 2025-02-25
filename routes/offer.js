const express = require("express");
const { createOffer } = require("../controllers/users/offer");

const router = express.Router();

/**
 * @swagger
 * /create-offer:
 *   post:
 *     description: Yangi taklif (offer) yaratadi va bazaga saqlaydi.
 *     tags:
 *       - Offers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - surname
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ali"
 *               surname:
 *                 type: string
 *                 example: "Karimov"
 *               phone:
 *                 type: string
 *                 example: "+998901234567"
 *     responses:
 *       201:
 *         description: Taklif muvaffaqiyatli yaratildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Ali"
 *                 surname:
 *                   type: string
 *                   example: "Karimov"
 *                 phone:
 *                   type: string
 *                   example: "+998901234567"
 *       400:
 *         description: Kiritilgan ma'lumotlar noto‘g‘ri
 *       500:
 *         description: Ichki server xatosi
 */

router.post("/create-offer", createOffer);

module.exports = router;
