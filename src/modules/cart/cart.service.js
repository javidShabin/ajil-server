import Cart from "./cart.model.js";
import { AppError } from "../../utils/AppError.js";
import { validateAddToCart } from "./cart.validation.js";
import mongoose from "mongoose";

export const addToCartService = async (data) => {
  // Validate input
  validateAddToCart(data);

  const { items } = data;

  // Find existing cart (you can change this later for per-user logic)
  let cart = await Cart.findOne();

  // Calculate new items total
  const newItemsTotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (!cart) {
    // Create new cart
    cart = await Cart.create({
      items,
      totalPrice: newItemsTotal,
    });
    return cart;
  }

  // Prevent duplicates
  const existingIds = cart.items.map((i) => i.productId.toString());
  const newFilteredItems = items.filter(
    (i) => !existingIds.includes(i.productId.toString())
  );

  if (newFilteredItems.length === 0) {
    throw new AppError("item already exist in the cart", 400);
  }

  // Add and recalc
  cart.items.push(...newFilteredItems);
  cart.totalPrice = cart.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  await cart.save();
  return cart;
};
