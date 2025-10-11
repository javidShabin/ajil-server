import { AppError } from "../../utils/AppError.js";
import User from "../authentication/auth.model.js";

export const userProfileService = async ({ id }) => {
  try {
    // Find the user by id
    const isUser = await User.findById(id).select("-password");
    if (!isUser) throw new AppError("User not found", 404);

    return { message: "User profile fetched successfully", data: isUser };
  } catch (error) {
    throw error;
  }
};
