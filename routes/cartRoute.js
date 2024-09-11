import express from "express";
import { createMid } from "../controllers/cart/createCartMid.js";
import { getAllMid } from "../controllers/cart/getAllMid.js";
import { deleteCartMid } from "../controllers/cart/deleteCartMid.js";

const router = express.Router();

router.get("/user-cart", getAllMid);
router.post("/create-item/:id", createMid);
router.delete("/delete-cart/:id", deleteCartMid);
export default router;
