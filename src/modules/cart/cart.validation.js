import { AppError } from "../../utils/AppError.js";


export const validateAddToCart = (data) => {
  const {productId, quantity, price, itemName, image } = data;
 

  if (!productId || typeof productId !== "string" || productId.trim().length === 0) {
    throw new AppError("Product ID is required and must be a non-empty string", 400);
  }

  if (quantity === undefined || quantity === null || isNaN(Number(quantity)) || Number(quantity) < 1) {
    throw new AppError("Quantity is required and must be a number >= 1", 400);
  }

  if (price === undefined || price === null || isNaN(Number(price)) || Number(price) < 0) {
    throw new AppError("Price is required and must be a non-negative number", 400);
  }

  if (!itemName || typeof itemName !== "string" || itemName.trim().length === 0) {
    throw new AppError("Item name is required and must be a non-empty string", 400);
  }

  if (!image || typeof image !== "string" || image.trim().length === 0) {
    throw new AppError("Image URL is required and must be a non-empty string", 400);
  }
};
