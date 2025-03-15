import express from "express";
import authenticate from "../controllers/users/auth.js";
import { registerMid } from "../controllers/users/register.js";
import { loginMid } from "../controllers/users/login.js";
import { passwordMid } from "../controllers/forgotPassword/passwordMid.js";
import { resetMid } from "../controllers/forgotPassword/resetMid.js";
import { changeNameEmail } from "../controllers/users/changeNameEmail.js";
import { changePassword } from "../controllers/users/changePass.js";
import { getByIDuser } from "../controllers/users/user.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *         - userrate
 *       properties:
 *         name:
 *           type: string
 *           description: User's name
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *           unique: true
 *         password:
 *           type: string
 *           description: User's password
 *         role:
 *           type: string
 *           enum:
 *             - customer
 *             - seller
 *           description: User's role in the system
 *           default: customer
 *         userrate:
 *           type: string
 *           enum:
 *             - yearly
 *             - monthly
 *             - daily
 *           description: User's subscription rate
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date when the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date when the user was last updated
 */

/**
 * @swagger
 * /user-register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /forgot-password:
 *   post:
 *     summary: Request password reset
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Password reset link sent
 *       400:
 *         description: Error processing request
 */

/**
 * @swagger
 * /reset-password/{token}:
 *   post:
 *     summary: Reset user password
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: Password reset token
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password successfully reset
 *       400:
 *         description: Invalid or expired token
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully logged in
 *       400:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /user-dashboard:
 *   get:
 *     summary: Access user dashboard
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User dashboard data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized access or missing/invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /update-name-email/{id}:
 *   put:
 *     summary: Update user's name and email
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique user ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newName:
 *                 type: string
 *               newEmail:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: User's name and email successfully updated
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /update-password/{id}:
 *   put:
 *     summary: Update user's password
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique user ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPass:
 *                 type: string
 *               newPass:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password successfully updated
 *       400:
 *         description: Invalid request or password mismatch
 *       404:
 *         description: User not found or old password is incorrect
 */

router.get("/user-find/:id", getByIDuser);
router.post("/user-register", registerMid);
router.post("/forgot-password", passwordMid);
router.post("/reset-password/:token", resetMid);
router.post("/login", loginMid);
router.get("/user-dashboard", authenticate);
router.put("/update-name-email/:id", changeNameEmail);
router.put("/update-password/:id", changePassword);

export default router;
