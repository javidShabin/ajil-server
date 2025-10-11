import { Router } from "express";
import userRoutes from "./modules/authentication/auth.routes.js";
import profileRoutes from "./modules/profile/profile.routes.js"

const router = Router();

router.use("/user", userRoutes);
router.use("/profile", profileRoutes)

export default router;
