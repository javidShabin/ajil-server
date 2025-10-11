import { Router } from "express";
import { addToCart, getCart} from "./cart.controller.js";

const router = Router();

router.post("/add-to-cart", addToCart)
router.get("/get-cart", getCart)

export default router;
