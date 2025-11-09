import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  shortDescription: string;
  color: string;
  rating: number;
  price: number;
  discount: number;
  size: string[];
  reviews: mongoose.Types.ObjectId[];
  longDescription: string;
  images: string[];
  faqs: { question: string; answer: string }[];
  category: mongoose.Types.ObjectId;
  type: string;
  brand: mongoose.Types.ObjectId;
  createdAt: Date;
  purchasedCount: number;
}

const ProductSchema: Schema = new Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  color: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  price: { type: Number, required: true },
  discount: { type: Number, required: true },
  size: [{ type: String, enum: ["small", "medium", "large", "x-large"] }],
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  longDescription: { type: String, required: true },
  images: [{ type: String }],
  faqs: [{ question: String, answer: String }],
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  type: {
    type: String,
    enum: ["T-shirt", "shorts", "shirts", "hoodie", "jeans"],
    required: true,
  },
  brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
  createdAt: { type: Date, default: Date.now },
  purchasedCount: { type: Number, default: 0 },
});

export default mongoose.model<IProduct>("Product", ProductSchema);
