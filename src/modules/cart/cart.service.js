import Cart from "./cart.model.js"
import { AppError } from "../../utils/AppError.js";
import { validateAddToCart } from "./cart.validation.js";

export const addToCartService = async (data) => {
  try {
    validateAddToCart(data);
    const { productId, quantity, price, itemName, image } = data;
    // Check if item already exists in cart
    let cartItem = await Cart.findOne({ productId });
    if (cartItem) {
      throw new AppError("Item already in the cart", 400);
    }
    // Create new cart item
    const newCartItem = new Cart({
      productId,
      quantity,
      price,
      itemName,
      image,
      totalPrice: quantity * price, // pre-calculate totalPrice
    });

    // Save to DB
    await newCartItem.save();

    return {
      success: true,
      message: "Item added to cart successfully",
      data: newCartItem,
    };
  } catch (error) {
    throw error;
  }
};
