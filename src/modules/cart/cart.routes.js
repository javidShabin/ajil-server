import { Router } from "express";
import { addToCart } from "./cart.controller.js";

const router = Router();

router.post("/add-to-cart", addToCart)

export default router;
