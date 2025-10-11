import mongoose, { Schema, model } from "mongoose";

const CartSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    itemName: { type: String, required: true },
    image: { type: String, required: true },
    totalPrice: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

CartSchema.pre("save", function (next) {
  this.totalPrice = this.quantity * this.price;
  next();
});

const Cart = model("Cart", CartSchema);
export default Cart;
