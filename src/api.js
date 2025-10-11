import { Router } from "express";
import productRoutes from "./modules/products/product.routes.js";
import cartRoutes from "./modules/cart/cart.routes.js";

const router = Router();

router.use("/product", productRoutes);
router.use("/cart", cartRoutes);

export default router;
