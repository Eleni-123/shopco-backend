import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  product: mongoose.Types.ObjectId;
  user: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

const ReviewSchema: Schema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  user: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IReview>("Review", ReviewSchema);
