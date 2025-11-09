import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  products: { product: mongoose.Types.ObjectId; quantity: number }[];
  total: number;
  createdAt: Date;
}

const OrderSchema: Schema = new Schema({
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IOrder>("Order", OrderSchema);
