import { Router } from "express";
import { addProduct } from "./product.controller.js";
import upload from "../../middlewares/multer.js";

const router = Router();

router.post("/add-product",upload.single("image"), addProduct)

export default router;