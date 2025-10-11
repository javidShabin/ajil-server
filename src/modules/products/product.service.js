import cloudinary from "../../configs/cloudinary.js";
import { AppError } from "../../utils/AppError.js";
import Product from "./product.model.js";
import { validateAddProduct } from "./product.validation.js";

// Add product service
export const addProductService = async (data, file) => {
  try {
    validateAddProduct(data);
    const { title, sku, price } = data;

    const existProduct = await Product.findOne({ sku });
    if (existProduct) {
      throw new AppError("Product already exists", 400);
    }

    let uploadResult;

    if (file) {
      uploadResult = await cloudinary.uploader.upload(file.path);
    } else {
      console.log("No file to upload.");
    }

    const newProduct = new Product({
      title,
      sku,
      price,
      image: uploadResult?.secure_url || "",
    });

    await newProduct.save();
    return { message: "New Product added", newProduct };
  } catch (error) {
    throw error;
  }
};

// Get all product list service

// Update Product details

// Delete product
