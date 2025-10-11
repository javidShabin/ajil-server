import { Router } from "express";
import { addToCart, getCart, updateCart } from "./cart.controller.js";

const router = Router();

router.post("/add-to-cart", addToCart);
router.get("/get-cart", getCart);
router.put("/update-cart", updateCart);

export default router;
