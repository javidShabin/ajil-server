import {
  addProductService,
  deleteProductService,
  getAllProductsService,
  getPorductByCategroyService,
  updateProductService,
} from "./product.service.js";

// Add product with details
export const addProduct = async (req, res, next) => {
  try {
    const result = await addProductService(req.body, req.file);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// Get all products
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await getAllProductsService();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// update a product
export const updateProduct = async (req, res, next) => {
  try {
    const result = await updateProductService(
      req.params.id,
      req.body,
      req.file
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// Delete a product
export const deleteProduct = async (req, res, next) => {
  try {
    const result = await deleteProductService(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllProductsbyCategory = async (req, res, next) => {
  try {
    const { category } = req.query; // pass ?category=Electronics
    const products = await getPorductByCategroyService(category);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
