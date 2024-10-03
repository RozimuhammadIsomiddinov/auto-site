const express = require("express");
const authenticate = require("../controllers/users/auth.js");
const { registerMid } = require("../controllers/users/register.js");
const { loginMid } = require("../controllers/users/login.js");
const { passwordMid } = require("../controllers/forgotPassword/passwordMid.js");
const { resetMid } = require("../controllers/forgotPassword/resetMid.js");
const { changeNameEmail } = require("../controllers/users/changeNameEmail.js");
const { changePassword } = require("../controllers/users/changePass.js");
const fileUpload = require("../middlewares/multer.js");
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
 *         - image
 *         - password
 *         - role
 *         - userrate
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
 *         image:
 *           type: string
 *           format: binary
 *           description: User's profile image URL
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
 *         multipart/form-data:
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
router.post("/user-register", fileUpload.single("image"), registerMid);

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
router.post("/forgot-password", passwordMid);

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
router.post("/reset-password/:token", resetMid);

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
router.post("/login", loginMid);

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
router.get("/user-dashboard", authenticate);

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
router.put("/update-name-email/:id", changeNameEmail);

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
router.put("/update-password/:id", changePassword);

module.exports = router;
