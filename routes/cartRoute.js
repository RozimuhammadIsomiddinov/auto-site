import express from "express";
import { createMid } from "../middlewares/cart/createCartMid.js";
import { getAllMid } from "../middlewares/cart/getAllMid.js";
import { deleteCartMid } from "../middlewares/cart/deleteCartMid.js";

const router = express.Router();

router.get("/user-cart", getAllMid);
router.post("/create-item/:id", createMid);
router.delete("/delete-cart/:id", deleteCartMid);
export default router;
