import { Router } from "express";
import {
  getArchive,
  addArchiveCar,
  addArchiveMoto,
  addArchiveCommerce,
  deleteArchiveCar,
  deleteArchiveMoto,
  deleteArchiveCommerce,
} from "../controllers/users/archive.js";

const router = Router();

/**
 * @swagger
 * /archives/{id}:
 *   get:
 *     summary: Foydalanuvchiga tegishli arxivlangan transportlarni olish
 *     tags: [Archive]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Foydalanuvchi ID si
 *     responses:
 *       200:
 *         description: Foydalanuvchiga tegishli arxivlangan transportlar ro'yxati
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 car:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Arxivlangan mashinalar
 *                 moto:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Arxivlangan mototsikllar
 *                 commerce:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Arxivlangan tijorat avtomobillari
 *       400:
 *         description: Noto'g'ri foydalanuvchi ID si yoki foydalanuvchi topilmadi
 *       500:
 *         description: Server xatosi
 */
router.get("/archives/:id", getArchive);

/**
 * @swagger
 * /add-cars:
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
router.post("/add-cars", addArchiveCar);

/**
 * @swagger
 * /add-moto:
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
router.post("/add-moto", addArchiveMoto);

/**
 * @swagger
 * /add-commerce:
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
router.post("/add-commerce", addArchiveCommerce);

/**
 * @swagger
 * /car:
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
router.delete("/car", deleteArchiveCar);

/**
 * @swagger
 * /moto:
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
router.delete("/moto", deleteArchiveMoto);

/**
 * @swagger
 * /commerce:
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
router.delete("/commerce", deleteArchiveCommerce);

export default router;
