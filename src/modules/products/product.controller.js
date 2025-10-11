import { addProductService } from "./product.service.js"

// Add product with details
export const addProduct = async (req, res, next) => {
    try {
        const result = await addProductService(req.body, req.file);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

// Get all product details

// update a product

// Delete a product