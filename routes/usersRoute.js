import express from "express";
import authenticate from "../middlewares/users/auth.js";
import { registerMid } from "../middlewares/users/register.js";
import { enteringMid } from "../middlewares/users/entering.js";
import { loginMid } from "../middlewares/users/login.js";
import { passwordMid } from "../middlewares/forgotPassword/passwordMid.js";
import { resetMid } from "../middlewares/forgotPassword/resetMid.js";

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique user identifier
 *         name:
 *           type: string
 *           description: User's name
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         password:
 *           type: string
 *           description: User's password
 *         role:
 *           type: string
 *           enum:
 *             - customer
 *             - seller
 *           description: User's role in the system
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date when the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date when the user was last updated
 */
router.post("/user-register", registerMid);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Foydalanuvchi login qilish
 */
router.post("/login", loginMid);

/**
 * @swagger
 * /forgot-password:
 *   post:
 *     summary: Parolni unutgan foydalanuvchi uchun
 */
router.post("/forgot-password", passwordMid);

/**
 * @swagger
 * /reset-password/{token}:
 *   post:
 *     summary: Parolni tiklash
 */
router.post("/reset-password/:token", resetMid);

/**
 * @swagger
 * /user-dashbord:
 *   get:
 *     summary: Foydalanuvchi dashboardiga kirish
 */
router.get("/user-dashbord", authenticate, enteringMid);

export default router;
