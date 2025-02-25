const express = require("express");
const {
  addArchiveCar,
  addArchiveMoto,
  addArchiveCommerce,
  deleteArchiveCar,
  deleteArchiveMoto,
  deleteArchiveCommerce,
} = require("../controllers/users/archive");
const router = express.Router();

/**
 * @swagger
 * /archive/add-car:
 *   post:
 *     summary: Mashinani arxivga qo'shish
 *     tags: [Archive]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: Arxivga qo'shiladigan mashinaning ID si
 *     responses:
 *       200:
 *         description: Mashina arxivga qo'shildi
 *       500:
 *         description: Server xatosi
 */

/**
 * @swagger
 * /archive/add-moto:
 *   post:
 *     summary: Mototsiklni arxivga qo'shish
 *     tags: [Archive]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: Arxivga qo'shiladigan mototsiklning ID si
 *     responses:
 *       200:
 *         description: Mototsikl arxivga qo'shildi
 *       500:
 *         description: Server xatosi
 */

/**
 * @swagger
 * /archive/add-commerce:
 *   post:
 *     summary: Tijorat avtomobilini arxivga qo'shish
 *     tags: [Archive]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: Arxivga qo'shiladigan tijorat avtomobilining ID si
 *     responses:
 *       200:
 *         description: Tijorat avtomobili arxivga qo'shildi
 *       500:
 *         description: Server xatosi
 */

/**
 * @swagger
 * /archive/car:
 *   delete:
 *     summary: Mashinani arxivdan olib tashlash
 *     tags: [Archive]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: Arxivdan chiqariladigan mashinaning ID si
 *     responses:
 *       200:
 *         description: Mashina arxivdan chiqarildi
 *       500:
 *         description: Server xatosi
 */

/**
 * @swagger
 * /archive/moto:
 *   delete:
 *     summary: Mototsiklni arxivdan olib tashlash
 *     tags: [Archive]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: Arxivdan chiqariladigan mototsiklning ID si
 *     responses:
 *       200:
 *         description: Mototsikl arxivdan chiqarildi
 *       500:
 *         description: Server xatosi
 */

/**
 * @swagger
 * /archive/commerce:
 *   delete:
 *     summary: Tijorat avtomobilini arxivdan olib tashlash
 *     tags: [Archive]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: Arxivdan chiqariladigan tijorat avtomobilining ID si
 *     responses:
 *       200:
 *         description: Tijorat avtomobili arxivdan chiqarildi
 *       500:
 *         description: Server xatosi
 */

router.post("/add-car", addArchiveCar);
router.post("/add-moto", addArchiveMoto);
router.post("/add-commerce", addArchiveCommerce);

router.delete("/car", deleteArchiveCar);
router.delete("/moto", deleteArchiveMoto);
router.delete("/commerce", deleteArchiveCommerce);
module.exports = router;
