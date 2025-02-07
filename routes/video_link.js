const express = require("express");
const { addLinkAvto, deleteLinkAvto } = require("../controllers/links/avto");
const {
  addLinkCommerce,
  deleteLinkCommerce,
} = require("../controllers/links/commerce");
const { addLinkMoto, deleteLinkMoto } = require("../controllers/links/moto");

const router = express.Router();
/**
 * @swagger
 * /avto-link/{id}:
 *   post:
 *     summary: Avtomobil uchun video havolasini qo'shish
 *     tags: [Link]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               video_link:
 *                 type: string
 *     responses:
 *       200:
 *         description: Video havolasi muvaffaqiyatli yangilandi
 *       404:
 *         description: Avtomobil topilmadi
 *       400:
 *         description: Xato yuz berdi
 */

/**
 * @swagger
 * /delete-avto-link/{id}:
 *   delete:
 *     summary: Avtomobil video havolasini o'chirish
 *     tags: [Link]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Video havolasi muvaffaqiyatli o'chirildi
 *       404:
 *         description: Avtomobil topilmadi
 *       400:
 *         description: Xato yuz berdi
 */

/**
 * @swagger
 * /commerce-link/{id}:
 *   post:
 *     summary: Tijorat avtomobili uchun video havolasini qo'shish
 *     tags: [Link]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               video_link:
 *                 type: string
 *     responses:
 *       200:
 *         description: Video havolasi muvaffaqiyatli yangilandi
 *       404:
 *         description: Tijorat avtomobili topilmadi
 *       400:
 *         description: Xato yuz berdi
 */

/**
 * @swagger
 * /delete-commerce-link/{id}:
 *   delete:
 *     summary: Commerce avtomobili video havolasini o'chirish
 *     tags: [Link]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Video havolasi muvaffaqiyatli o'chirildi
 *       404:
 *         description: Tijorat avtomobili topilmadi
 *       400:
 *         description: Xato yuz berdi
 */

/**
 * @swagger
 * /moto-link/{id}:
 *   post:
 *     summary: Mototsikl uchun video havolasini qo'shish
 *     tags: [Link]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               video_link:
 *                 type: string
 *     responses:
 *       200:
 *         description: Video havolasi muvaffaqiyatli yangilandi
 *       404:
 *         description: Mototsikl topilmadi
 *       400:
 *         description: Xato yuz berdi
 */

/**
 * @swagger
 * /delete-moto-link/{id}:
 *   delete:
 *     summary: Mototsikl video havolasini o'chirish
 *     tags: [Link]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Video havolasi muvaffaqiyatli o'chirildi
 *       404:
 *         description: Mototsikl topilmadi
 *       400:
 *         description: Xato yuz berdi
 */

router.post("/avto-link/:id", addLinkAvto);
router.post("/commerce-link/:id", addLinkCommerce);
router.post("/moto-link/:id", addLinkMoto);

router.delete("/delete-avto-link/:id", deleteLinkAvto);
router.delete("/delete-commerce-link/:id", deleteLinkCommerce);
router.delete("/delete-moto-link", deleteLinkMoto);

module.exports = router;
