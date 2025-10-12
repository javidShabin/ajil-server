import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getAllProductsbyCategory,
  getNormalProducts,
  getPremiumProducts,
  updateProduct,
} from "./product.controller.js";
import upload from "../../middlewares/multer.js";

const router = Router();

router.post("/add-product", upload.single("image"), addProduct);
router.get("/get-all-products", getAllProducts);
router.get("/get-premium", getPremiumProducts)
router.get("/get-normal", getNormalProducts)
router.put("/update-product/:id", upload.single("image"), updateProduct);
router.delete("/delete-product/:id", deleteProduct);
router.get("/filter-product", getAllProductsbyCategory);

export default router;
