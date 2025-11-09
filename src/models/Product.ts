import mongoose, { Schema, Document } from "mongoose";

export type SizeType = "Small" | "Medium" | "Large" | "X-Large";
export type ProductType = "T-shirt" | "Shorts" | "Shirts" | "Hoodie" | "Jeans";

export interface IFAQ {
  question: string;
  answer: string;
}

export interface IProduct extends Document {
  title: string;
  shortDescription: string;
  longDescription: string;
  color: string;
  rating: number;
  price: number;
  discount: number;
  sizes: SizeType[];
  images: string[];
  faqs: IFAQ[];
  category: mongoose.Types.ObjectId;
  type: ProductType;
  brand: mongoose.Types.ObjectId;
  purchaseCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const faqSchema = new Schema<IFAQ>(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
      maxlength: 200,
    },
    longDescription: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
      match: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    sizes: [
      {
        type: String,
        enum: ["Small", "Medium", "Large", "X-Large"],
      },
    ],
    images: [
      {
        type: String,
        required: true,
      },
    ],
    faqs: [faqSchema],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["T-shirt", "Shorts", "Shirts", "Hoodie", "Jeans"],
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    purchaseCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
productSchema.index({ createdAt: -1 });
productSchema.index({ purchaseCount: -1 });
productSchema.index({ category: 1 });
productSchema.index({ type: 1 });

export default mongoose.model<IProduct>("Product", productSchema);
