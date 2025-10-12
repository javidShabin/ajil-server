import { Router } from "express";
import userRoutes from "./modules/authentication/auth.routes.js"
import productRoutes from "./modules/products/product.routes.js";
import cartRoutes from "./modules/cart/cart.routes.js";

const router = Router();

router.use("/user", userRoutes)
router.use("/product", productRoutes);
router.use("/cart", cartRoutes);

export default router;
