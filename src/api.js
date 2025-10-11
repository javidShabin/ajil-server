import { Router } from "express";
import productRoutes from "./modules/products/product.routes.js"

const router = Router();

router.use("/product",productRoutes)

export default router;
