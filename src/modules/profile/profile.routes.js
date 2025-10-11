import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { getUserProfile } from "./profile.controller.js";
import upload from "../../middlewares/multer.js";
const router = Router();

router.get("/user-profile", authMiddleware, getUserProfile);

export default router;
