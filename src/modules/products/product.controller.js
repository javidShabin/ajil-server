import {
  addProductService,
  ByCategoryNormalService,
  ByCategoryPremiumService,
  deleteProductService,
  getAllProductsService,
  getPorductByCategroyService,
  getProductByNormal,
  getProductByPremium,
  getProductsByTypeService,
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
    const { page = 1, limit = 20 } = req.query;
    const result = await getAllProductsService(page, limit);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getPremiumProducts = async (req, res, next) => {
  try {
    const products = await getProductByPremium();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getNormalProducts = async (req, res, next) => {
  try {
    const products = await getProductByNormal();
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

export const getProductsbyCategoryPremium = async (req, res, next) => {
  try {
    const { category } = req.query; // Example: /filter-premium?category=Electronics
    const products = await ByCategoryPremiumService(category);

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductsbyCategoryNormal = async (req, res, next) => {
  try {
    const { category } = req.query; // Example: /filter-premium?category=Electronics
    const products = await ByCategoryNormalService(category);

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductsByTypeController = async (req, res, next) => {
  try {
    const { type } = req.query; // we get type from query string
    
    const products = await getProductsByTypeService(type);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
