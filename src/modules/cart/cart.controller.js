import { addToCartService } from "./cart.service.js";


export const addToCart = async (req, res, next) => {
  try {
    

    const result = await addToCartService(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

