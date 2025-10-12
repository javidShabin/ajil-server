import cloudinary from "../../configs/cloudinary.js";
import { AppError } from "../../utils/AppError.js";
import Product from "./product.model.js";
import { validateAddProduct } from "./product.validation.js";

// Add product service
export const addProductService = async (data, file) => {
  try {
    validateAddProduct(data);
    const { title, sku, price, category, types } = data;

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
      category,
      types,
      image: uploadResult?.secure_url || "",
    });

    await newProduct.save();
    return { message: "New Product added", newProduct };
  } catch (error) {
    throw error;
  }
};

// Get all product list service
export const getAllProductsService = async () => {
  const products = await Product.find().sort({ createdAt: -1 });
  return products;
};

export const getProductByPremium = async () => {
  try {
    const products = await Product.find({ types: "premium" }).sort({
      createdAt: -1,
    });
    return products;
  } catch (error) {
    throw error;
  }
};

export const getProductByNormal = async () => {
  try {
    const products = await Product.find({ types: "normal" }).sort({
      createdAt: -1,
    });
    return products;
  } catch (error) {
    throw error;
  }
};

// Update Product details
export const updateProductService = async (id, data, file) => {
  const product = await Product.findById(id);
  if (!product) throw new AppError("Product not found", 404);

  const { title, sku, price, category } = data;

  if (title) product.title = title;
  if (sku) product.sku = sku;
  if (price !== undefined) product.price = price;
  if (category) product.category = category;

  if (file) {
    const uploadResult = await cloudinary.uploader.upload(file.path);
    product.image = uploadResult.secure_url;
  }

  await product.save();
  return { message: "Product updated", product };
};

// Delete product
export const deleteProductService = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new AppError("Product not found", 404);

  await Product.findByIdAndDelete(id);
  return { message: "Product deleted successfully" };
};

// filter by category
export const getPorductByCategroyService = async (category) => {
  const filter = category ? { category } : {};
  const products = await Product.find(filter).sort({ createdAt: -1 });
  return products;
};

export const ByCategoryPremiumService = async (category) => {
  // Only fetch products with types "premium"
  const filter = { types: "premium" };

  // Add category filter if provided
  if (category) {
    filter.category = category;
  }

  // Fetch products sorted by newest first
  const products = await Product.find(filter).sort({ createdAt: -1 });
  return products;
};

export const ByCategoryNormalService = async (category) => {
  // Only fetch products with types "premium"
  const filter = { types: "normal" };

  // Add category filter if provided
  if (category) {
    filter.category = category;
  }

  // Fetch products sorted by newest first
  const products = await Product.find(filter).sort({ createdAt: -1 });
  return products;
};